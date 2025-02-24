import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './api';
import toast from 'react-hot-toast';

const CreateUser = () => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [age, setAge] = useState('');
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name || !email || !age) {
         toast.error("All fields are required!");
         return;
      }

      try {
         await createUser({ name, email, age });
         toast.success("User created successfully!");
         navigate('/');
      } catch (error) {
         toast.error("Failed to create user.");
      }
   };

   return (
      <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
         <div className='w-50 bg-white rounded p-3 shadow'>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
               <div className='mb-2'>
                  <label>Name</label>
                  <input type="text" placeholder='Enter Name' className='form-control'
                     value={name} onChange={(e) => setName(e.target.value)} />
               </div>
               <div className='mb-2'>
                  <label>Email</label>
                  <input type="email" placeholder='Enter Email' className='form-control'
                     value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>
               <div className='mb-2'>
                  <label>Age</label>
                  <input type="number" placeholder='Enter Age' className='form-control'
                     value={age} onChange={(e) => setAge(e.target.value)} />
               </div>
               <button className='btn btn-primary'>Submit</button>
            </form>
         </div>
      </div>
   );
}

export default CreateUser;
