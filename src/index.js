import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './routes/Login';
import Error from './routes/Error'
import NavBar from './components/Navbar'
import Register from './routes/Register';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        errorElement: <Error />,
        children: [
            {
                path: "auth/login",
                element: <Login />
            },
            {
                path: "auth/register",
                element: <Register />
            }
        ]
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}></RouterProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
