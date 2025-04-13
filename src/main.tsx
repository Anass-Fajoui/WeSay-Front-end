import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import "./main.css";

import FeedPage from "./Pages/FeedPage.tsx";
import ProfilePage from "./Pages/ProfilePage.tsx";
import CreateTweetPage from "./Pages/CreateTweetPage.tsx";
import EditTweetPage from "./Pages/EditTweetPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <FeedPage />
    },
    {
        path: "/register",
        element: <RegisterPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "/feed",
        element: <FeedPage />,
    },
    {
        path: "/create",
        element: <CreateTweetPage />,
    },
    {
      path: "/edit/:id",
      element: <EditTweetPage />
    },
    {
      path: "/profile/:id",
      element: <ProfilePage />,
    }
]);

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <RouterProvider router={router} />
    // </StrictMode>
);
