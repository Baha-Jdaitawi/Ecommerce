import {
    getStatsApi
    , getAdminOrdersApi,
    updateOrderStatusApi,
    getAllUsersApi
} from '../api/adminApi.js';


export const getStatsService = async () => {
  const response = await getStatsApi();
  return response.data.stats;
};

export const getAdminOrdersService = async () => {
  const response = await getAdminOrdersApi();
  return response.data.orders;
};

export const updateOrderStatusService = async (id, status) => {
  const response = await updateOrderStatusApi(id, status);
  return response.data.order;
};

export const getAllUsersService = async () => {
  const response = await getAllUsersApi();
  return response.data.users;
};