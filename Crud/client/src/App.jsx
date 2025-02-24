import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Users from './Users'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import { Toaster } from 'react-hot-toast';

function App() {
  

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <BrowserRouter>

      <Routes>
       
       <Route path='/' element={<Users />}></Route>
       <Route path='/create' element={<CreateUser />}></Route>
       <Route path='/update/:id' element={<UpdateUser />}></Route>

      </Routes>

      </BrowserRouter>
    
    
     </>
  )
}

export default App
