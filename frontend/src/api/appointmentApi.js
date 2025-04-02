const API_BASE_URL = "https://backend-ip1x.onrender.com/api/appointments";

// Helper function to get token from localStorage
const getToken = () => localStorage.getItem('token'); // Retrieve the token from localStorage

// Fetch appointments for the logged-in user
export const fetchAppointments = async (token) => {
  try {
    token = token || getToken(); // Use the token passed as parameter or get it from localStorage
    
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Adding "Bearer" before the token
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Capture any error response from the API
      throw new Error(`Failed to fetch appointments: ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error; // Rethrow the error so that the caller can handle it
  }
};

// Update an appointment
export const updateAppointment = async (id, updatedData, token) => {
  try {
    token = token || getToken(); // Use the token passed as parameter or get it from localStorage
    
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Adding "Bearer" before the token
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Capture error response from the API
      throw new Error(`Failed to update appointment: ${errorData.message || "Unknown error"}`);
    }

    return response.json(); // Return the updated appointment
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw error; // Rethrow the error so that the caller can handle it
  }
};

// Delete an appointment
export const deleteAppointment = async (id, token) => {
  try {
    token = token || getToken(); // Use the token passed as parameter or get it from localStorage
    
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`, // Adding "Bearer" before the token
      }
    });

    if (!response.ok) {
      const errorData = await response.json(); // Capture error response from the API
      throw new Error(`Failed to delete appointment: ${errorData.message || "Unknown error"}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error; // Rethrow the error so that the caller can handle it
  }
};
