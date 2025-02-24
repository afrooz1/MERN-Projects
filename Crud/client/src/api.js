import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchUsers = async () => {
   try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
   }
};

export const createUser = async (userData) => {
   try {
      const response = await axios.post(`${API_URL}/createUser`, userData);
      return response.data;
   } catch (error) {
      console.error("Error creating user:", error);
      throw error;
   }
};

export const deleteUser = async (id) => {
   try {
      await axios.delete(`${API_URL}/deleteUser/${id}`);
   } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
   }
};

export const getUserById = async (id) => {
   try {
      const response = await axios.get(`${API_URL}/getUser/${id}`);
      return response.data;
   } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
   }
};

export const updateUser = async (id, updatedData) => {
   try {
      const response = await axios.put(`${API_URL}/updateUser/${id}`, updatedData);
      return response.data;
   } catch (error) {
      console.error("Error updating user:", error);
      throw error;
   }
};
