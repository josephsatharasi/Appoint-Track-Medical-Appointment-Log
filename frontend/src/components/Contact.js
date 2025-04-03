import React from "react";  
import "../styles/Contact.css";  

const Contact = () => {  
  return (  
    <div className="contact-container">  
      <h1>Contact Us</h1>  
      <p>  
        We would love to hear from you! If you have any questions, suggestions,  
        or need assistance, please reach out to us using the details below.  
      </p>  

      <div className="contact-details">  
        <p><strong>Email:</strong> support@appointtrack.com</p>  
        <p><strong>Phone:</strong> +1 (123) 456-7890</p>  
        <p><strong>Address:</strong> 123 Health Street, Wellness City, WC 56789</p>  
      </div>  

      <p>  
        Our team is available Monday to Sunday, 9 AM - 5:30 PM.  
        We look forward to assisting you!  
      </p>  
    </div>  
  );  
};  

export default Contact;
