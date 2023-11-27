import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Components/Home/HomePage";
import SignInPage from "../Components/Signin/SignInPage";
import RegistrationPage from "../Components/Registration/RegistrationPage";

export const getRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            },
            {
                path: '/signin',
                element: <SignInPage></SignInPage>
            },
            {
                path: '/registration',
                element: <RegistrationPage></RegistrationPage>
            }
        ]
    }
]);