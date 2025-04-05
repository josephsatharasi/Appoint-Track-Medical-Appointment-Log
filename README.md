# **AppointTrack - Medical Appointment Log**


AppointTrack is a full-stack web application that allows users to log, manage, and track their medical appointments. It provides a user-friendly interface for securely managing appointment records, with support for filtering, sorting, and status tracking.

---

## Features

- **User Authentication**: Secure login and registration system. Users can only access their own appointment data.
- **Appointment Management (CRUD)**:
  - **Create**: Add new appointments with provider name, date/time, reason, and status.
  - **Read**: View a list of all appointments and see full details of each.
  - **Update**: Modify appointment information or status (e.g., 'Upcoming', 'Completed', 'Cancelled').
  - **Delete**: Remove appointments from the log.
- **Filtering & Sorting**:
  - Filter appointments by status or upcoming date range.
  - Sort appointments by date.
- **Summary Statistics**: Display appointment summaries (e.g., "Upcoming Appointments (Next 7 days): Y").
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

---

## Technologies

- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

---

## Project Structure

The project is divided into two main directories:

- **backend**: Contains server-side code, Express routes, authentication, and MongoDB logic.
- **frontend**: Contains the React client-side code for the user interface.

---

## Setup & Installation

Follow these steps to set up the application locally.

### 1. Clone the Repository

```bash
git clone (https://github.com/josephsatharasi/Appoint-Track-Medical-Appointment-Log.git)
```

### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in both the frontend and backend directories:

#### Frontend `.env`

```bash
REACT_APP_API_URL=Enter_your_frontend_URL
```

#### Backend `.env`

```bash
MONGO_URI=Enter_your_MONGODB_URL
JWT_SECRET=your_secret_key
EMAIL_USER=ENter_your_E-MAIL    
EMAIL_PASS=Enter_your_Password
FRONTEND_URL=
PORT=Enter_Your_Port
```

### Replace placeholders with your actual credentials.

---

## Running the Application

Start the backend server:

```bash
cd backend
npm start
```

Start the frontend server:

```bash
cd frontend
npm start
```

The application will be available at [Frontend](https://frontend-rsli.onrender.com/) (or another port, depending on your configuration).

---

## API Documentation

### Example Endpoints

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.
- **GET** `/api/appointments`: Get all appointments for the logged-in user.
- **POST** `/api/appointments`: Create a new appointment.
- **PUT** `/api/appointments/:id`: Update an existing appointment.
- **DELETE** `/api/appointments/:id`: Delete an appointment.



## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

