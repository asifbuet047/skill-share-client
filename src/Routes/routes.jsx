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
import PrivateRoute from "../Routes/PrivateRoute"
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import MyClassProgress from "../Components/Dashboard/Teacher/MyClassesPage/MyClassProgress";
import EnrolledClassAssignment from "../Components/Dashboard/Student/EnrolledClassAssignment/EnrolledClassAssignment";

export const getRoutes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'signin',
                element: <SignInPage></SignInPage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'registration',
                element: <RegistrationPage></RegistrationPage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'becomeateacher',
                element: <PrivateRoute><BecomeTeacherRequest></BecomeTeacherRequest></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'allclasses',
                element: <AllClasses></AllClasses>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'class/:id',
                element: <PrivateRoute><ClassDetails></ClassDetails></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'payment/:id',
                element: <PaymentPage></PaymentPage>,
                errorElement: <PageNotFound></PageNotFound>,
            }

        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        errorElement: <PageNotFound></PageNotFound>,
        children: [
            {
                path: 'request',
                element: <TeachersClassRequestPage></TeachersClassRequestPage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'addclass',
                element: <PrivateRoute><AddClassPage></AddClassPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'enroll',
                element: <PrivateRoute><EnrollClassesPage></EnrollClassesPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'myclass',
                element: <PrivateRoute><MyClassesPage></MyClassesPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'updateclass/:id',
                element: <PrivateRoute><UpdateClassPage></UpdateClassPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'profile/',
                element: <UserProfilePage></UserProfilePage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'allclasses',
                element: <PrivateRoute><AllClassesPage></AllClassesPage></PrivateRoute>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'feedback/:id',
                element: <Feedback></Feedback>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'allusers',
                element: <AllUsersPage></AllUsersPage>,
                errorElement: <PageNotFound></PageNotFound>,
            },
            {
                path: 'class/:id',
                element: <MyClassProgress></MyClassProgress>,
                errorElement: <PageNotFound></PageNotFound>
            },
            {
                path: 'myenroll/:id',
                element: <EnrolledClassAssignment></EnrolledClassAssignment>
            }
        ]
    }
]);