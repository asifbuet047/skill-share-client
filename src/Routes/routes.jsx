import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Components/Home/HomePage";
import SignInPage from "../Components/Signin/SignInPage";
import RegistrationPage from "../Components/Registration/RegistrationPage";
import Dashboard from "../Components/Dashboard/Dashboard";
import AddClassPage from "../Components/Dashboard/Teacher/AddClassPage/AddClassPage"
import EnrollClassesPage from "../Components/Dashboard/Student/EnrollClassesPage/EnrollClassesPage"
import TeachersClassRequestPage from "../Components/Dashboard/Admin/TeachersClassRequestPage/TeachersClassRequestPage";

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
                path: 'signin',
                element: <SignInPage></SignInPage>
            },
            {
                path: 'registration',
                element: <RegistrationPage></RegistrationPage>
            }

        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'request',
                element: <TeachersClassRequestPage></TeachersClassRequestPage>
            },
            {
                path: 'addclass',
                element: <AddClassPage></AddClassPage>
            },
            {
                path: 'enroll',
                element: <EnrollClassesPage></EnrollClassesPage>
            }
        ]
    }
]);