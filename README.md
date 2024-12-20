# Web-Based Photo Hosting APP with AI Auto Tagging 

This is a web-based react application developed for the **Advanced Programming** module assignment of my **HND Computing Degree**. The app allows users to create individual accounts, upload photos from their accounts and get automatically generated tags using **Google Cloud Vision**.

## Main Features
- **Create User Accounts**: Users can create individual accounts to access the app platform.
- **Photo Upload**: Users can upload photos to the platform and choose between making them public or private.
- **Auto-Tagging**: The app integrates with **Google Cloud Vision** to automatically generate tags for the uploaded photos.
- **Photo Viewing**: Users can view public photos uploaded on the platform by other users.

## Technologies Used
- **Frontend**: React
- **Backend**: JSON Server (with json-server-auth for authentication)
- **Database**: db.json (Used by JSON Server as a mock database for development)
- **State Management**: Redux Toolkit, React-Redux
- **Routing**: React Router

## Getting Started

Make sure you have Node.js installed on your local machine.

In the command prompt of the project directory, run:

### npm install
This will instrall the necessary dependencies. 

### npm run start:server
This will start the mock backend server (JSON Server)

In a new command prompt of the project directory, run:

### npm start
This will launch the React app at http://localhost:3000.

## API Key Information

The API key used in this project (AIzaSyClxGPA_0e1kdez3fsQMCVaaKuCXznlxxE) is expired and can no longer be used. To run the project successfully, you must replace the key with a valid Google Cloud Vision API key. Do this in `line 18` of the `src>Photos.js` file. 

##