import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const getRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
]);