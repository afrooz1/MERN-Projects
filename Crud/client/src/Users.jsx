import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from './api';
import toast from 'react-hot-toast';

const Users = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [deleting, setDeleting] = useState(null);

   useEffect(() => {
      loadUsers();
   }, []);

   const loadUsers = async () => {
      try {
         const data = await fetchUsers();
         setUsers(data);
      } catch (error) {
         toast.error("Failed to load users");
      } finally {
         setLoading(false);
      }
   };

   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      setDeleting(id);
      try {
         await deleteUser(id);
         setUsers(users.filter(user => user._id !== id));
         toast.success("User deleted successfully");
      } catch (error) {
         toast.error("Failed to delete user");
      } finally {
         setDeleting(null);
      }
   };

   if (loading) return <div className="text-center mt-5">Loading users...</div>;

   return (
      <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
         <div className='w-75 bg-white rounded p-3 shadow'>
            <div className="d-flex justify-content-between align-items-center mb-3">
               <h3>User List</h3>
               <Link to="/create" className='btn btn-primary'>Add +</Link>
            </div>

            {users.length === 0 ? (
               <p className="text-center">No users found.</p>
            ) : (
               <table className='table table-bordered'>
                  <thead className='table-dark'>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => (
                        <tr key={user._id}>
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>{user.age}</td>
                           <td>
                              <Link to={`/update/${user._id}`} className='btn btn-success mx-2'>Update</Link>
                              <button 
                                 className='btn btn-danger' 
                                 onClick={() => handleDelete(user._id)}
                                 disabled={deleting === user._id} // Disable when deleting
                              >
                                 {deleting === user._id ? "Deleting..." : "Delete"}
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            )}
         </div>
      </div>
   );
}

export default Users;
