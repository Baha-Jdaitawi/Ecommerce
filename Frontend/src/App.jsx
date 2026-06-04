import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import LoginPage from './features/auth/pages/LoginPage'
import { RegisterPage } from './features/auth/pages/RegisterPage'
import AuthProvider from './features/auth/context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'


function App() {
 

  return (
    <>
     
<AuthProvider>

<Routes>
<Route path='/register' element={<RegisterPage/>}/>
<Route path='/login' element={<LoginPage/>}/>
</Routes>

</AuthProvider>



        
    </>
  )
}

export default App
