# QuickTrial

QuickTrial is a demo website that allows users to register, log in, and experience a timed demo of premium features. Built with the MERN stack (MongoDB, Express, React, Node.js), this project showcases a user-friendly interface and a seamless countdown feature for subscription management.

## Features

- **User registration and login**: Secure account creation and access for users.
- **Countdown timer for free trials**: Users can track their remaining time during the trial period.
- **Subscription upgrade options**: Users can easily upgrade to premium features once their trial ends.
- **Responsive design**: Works seamlessly on desktops, tablets, and mobile devices.

## Technologies Used

- **Frontend**: 
  - React
  - Vite
  - Tailwind CSS
- **Backend**: 
  - Node.js
  - Express
- **Database**: 
  - MongoDB
- **Authentication**: 
  - JWT (JSON Web Tokens)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Hashim020/QuickTrial.git
   cd QuickTrial
   ```

2. **Install Dependencies**:

   Navigate to the backend directory and install the required dependencies:
   ```bash
   cd backend
   npm install
   ```

   Then, navigate to the frontend directory and install the required dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the `backend` directory with the following content (make sure to replace placeholders with your actual values):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Configure Environment Variables for frontend**:

   Create a `.env` file in the `frontend` directory with the following content (make sure to replace placeholders with your actual values):
   ```
   VITE_GOOGLE_CLIENT_ID=your_google_auth_clientID
   ```

4. **Run the Backend Server**:

   After setting up the environment variables, start the backend server:
   ```bash
   cd backend
   node server.js
   ```

5. **Run the Frontend Application**:

   In a new terminal window, navigate to the frontend directory and start the development server:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**:

   Open your web browser and go to `http://localhost:5173` to access the QuickTrial application.
