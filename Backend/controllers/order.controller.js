import Stripe from 'stripe';
import { createOrder, createOrderItems, getOrdersByUserId, getOrderById } from '../models/order.model.js';
import { clearCart } from '../models/cart.model.js';
import { query } from '../config/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkout = async (req, res) => {
  try {
    const { items, shipping_address } = req.body;

    for (const item of items) {
      const product = await query('SELECT stock FROM products WHERE id = $1', [item.product_id]);
      if (!product.rows[0] || product.rows[0].stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${item.name}` });
      }
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });

    const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await createOrder(req.user.id, total_amount, shipping_address, session.id);
    await createOrderItems(order.id, items);

    for (const item of items) {
      await query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await clearCart(req.user.id);

    res.status(201).json({ url: session.url, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await getOrdersByUserId(req.user.id);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};