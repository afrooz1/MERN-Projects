import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateUser = () => {
   const { id } = useParams(); // Extracting user ID from the URL
   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [age, setAge] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   // Fetch user data when component loads
   useEffect(() => {
      axios.get(`http://localhost:3001/getUser/${id}`)
         .then(result => {
            setName(result.data.name);
            setEmail(result.data.email);
            setAge(result.data.age);
         })
         .catch(err => {
            console.error("Error fetching user:", err);
            setError("Failed to fetch user data.");
         });
   }, [id]);

   const handleUpdate = (e) => {
      e.preventDefault();

      // Form validation
      if (!name || !email || !age) {
         setError("Please fill in all fields.");
         return;
      }

      setLoading(true);
      setError(""); // Reset error state

      axios.put(`http://localhost:3001/updateUser/${id}`, { name, email, age })
         .then(() => {
            console.log("User Updated Successfully");
            navigate('/'); // Redirect to homepage
         })
         .catch(err => {
            console.error("Update failed:", err);
            setError("Failed to update user. Please try again.");
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
         <div className="w-50 bg-white shadow-lg p-4 rounded">
            <h2 className="mb-4 text-center">Update User</h2>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleUpdate}>
               <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Enter Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>

               <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                     type="email"
                     className="form-control"
                     placeholder="Enter Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input
                     type="number"
                     className="form-control"
                     placeholder="Enter Age"
                     value={age}
                     onChange={(e) => setAge(e.target.value)}
                  />
               </div>

               <button className="btn btn-success w-100" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
               </button>
            </form>
         </div>
      </div>
   );
};

export default UpdateUser;
