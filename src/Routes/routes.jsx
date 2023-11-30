import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Components/Home/HomePage";
import SignInPage from "../Components/Signin/SignInPage";
import RegistrationPage from "../Components/Registration/RegistrationPage";
import Dashboard from "../Components/Dashboard/Dashboard";
import AddClassPage from "../Components/Dashboard/Teacher/AddClassPage/AddClassPage"
import EnrollClassesPage from "../Components/Dashboard/Student/EnrollClassesPage/EnrollClassesPage"
import TeachersClassRequestPage from "../Components/Dashboard/Admin/TeachersClassRequestPage/TeachersClassRequestPage";
import MyClassesPage from "../Components/Dashboard/Teacher/MyClassesPage/MyClassesPage"
import UpdateClassPage from "../Components/Dashboard/Teacher/UpdateClassPage/UpdateClassPage";
import UserProfilePage from "../Components/Dashboard/UserProfilePage/UserProfilePage"
import BecomeTeacherRequest from "../Components/BecomeTeacherRequest/BecomeTeacherRequest";
import AllClasses from "../Components/AllClasses/AllClasses";
import ClassDetails from "../Components/ClassDetails/ClassDetails";
import AllClassesPage from "../Components/Dashboard/Admin/AllClassesPage/AllClassesPage";
import Feedback from "../Components/Feedback/Feedback";
import PaymentPage from "../Components/PaymentPage/PaymentPage";
import AllUsersPage from "../Components/Dashboard/Admin/AllUsersPage/AllUsersPage";

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
            },
            {
                path: 'becomeateacher',
                element: <BecomeTeacherRequest></BecomeTeacherRequest>
            },
            {
                path: 'allclasses',
                element: <AllClasses></AllClasses>
            },
            {
                path: 'class/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>
            },
            {
                path: 'payment/:id',
                element: <PaymentPage></PaymentPage>
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
                element: <PrivateRoute><AddClassPage></AddClassPage></PrivateRoute>
            },
            {
                path: 'enroll',
                element: <PrivateRoute><EnrollClassesPage></EnrollClassesPage></PrivateRoute>
            },
            {
                path: 'myclass',
                element: <PrivateRoute><MyClassesPage></MyClassesPage></PrivateRoute>
            },
            {
                path: 'updateclass/:id',
                element: <PrivateRoute><UpdateClassPage></UpdateClassPage></PrivateRoute>
            },
            {
                path: 'profile/',
                element: <UserProfilePage></UserProfilePage>
            },
            {
                path: 'allclasses',
                element: <PrivateRoute><AllClassesPage></AllClassesPage></PrivateRoute>
            },
            {
                path: 'feedback/:id',
                element: <Feedback></Feedback>
            },
            {
                path: 'allusers',
                element: <AllUsersPage></AllUsersPage>
            }
        ]
    }
]);