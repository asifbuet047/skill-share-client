import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, Outlet } from 'react-router-dom';
import useGetCurrentUserHook from '../../Hooks/useGetCurrentUserHook';
import NavigationBar from '../NavigationBar/NavigationBar';
import { Button } from '@mui/material';
import { GiTeacher } from "react-icons/gi";


function Dashboard() {
    const currentUser = useGetCurrentUserHook();
    console.log(currentUser);
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className='flex flex-row w-full h-full'>
                <div className='hidden md:block w-1/4'>
                    {
                        currentUser?.data?.role === "Admin" &&
                        (
                            <div className='w-full h-screen rounded-lg flex flex-col bg-base-200'>
                                <NavLink to={'/dashboard/request'}>
                                    <Button startIcon={<GiTeacher />}>Teacher Request</Button>
                                </NavLink>
                                <NavLink>
                                    <Button startIcon={<PeopleIcon />}>Users</Button>
                                </NavLink>
                                <NavLink>
                                    <Button startIcon={<SchoolIcon />}>All CLasses</Button>
                                </NavLink>
                                <NavLink>
                                    <Button startIcon={<PersonIcon />}>Profile</Button>
                                </NavLink>

                            </div>
                        )

                    }
                </div>
                <div className='w-3/4 border-2'>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    )
}

export default Dashboard