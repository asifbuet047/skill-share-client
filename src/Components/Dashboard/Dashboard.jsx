import { Sidebar } from 'flowbite-react'
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, Outlet } from 'react-router-dom';
import useGetCurrentUser from '../../Hooks/useGetCurrentUser';
import NavigationBar from '../NavigationBar/NavigationBar';
import { Button } from '@mui/material';
import { GiTeacher } from "react-icons/gi";
import { useState } from 'react';
import ClockLoading from '../DataLoadingComponents/ClockLoading';


function Dashboard() {
    const data = useGetCurrentUser();
    return (
        <div>
            <NavigationBar></NavigationBar>
            {
                data.isFetching ?
                    <ClockLoading />
                    :
                    <div className='flex flex-col'>
                        <div className='w-full h-10 flex flex-row justify-center items-center border-2 rounded-lg border-green-500'>
                            {
                                data?.data?.data?.role === "Admin" && <span>Admin Dashboard</span>
                            }
                            {
                                data?.data?.data?.role === "Teacher" && <span>Teacher Dashboard</span>
                            }
                            {
                                data?.data?.data?.role === "Student" && <span>Student Dashboard</span>
                            }
                        </div>
                        <div className='flex flex-row w-full h-full'>
                            <div className='hidden md:block w-1/4 border-2 rounded-lg border-green-500'>
                                {
                                    data?.data?.data?.role === "Admin" &&
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
                                {
                                    data?.data?.data?.role === "Teacher" &&
                                    (
                                        <div className='w-full h-screen rounded-lg flex flex-col bg-base-200'>
                                            <NavLink to={'/dashboard/addclass'}>
                                                <Button startIcon={<GiTeacher />}>Add Class</Button>
                                            </NavLink>
                                            <NavLink to={'/dashboard/myclass'}>
                                                <Button startIcon={<PeopleIcon />}>My Class</Button>
                                            </NavLink>
                                            <NavLink>
                                                <Button startIcon={<PersonIcon />}>Profile</Button>
                                            </NavLink>

                                        </div>
                                    )

                                }
                                {
                                    data?.data?.data?.role === "Student" &&
                                    (
                                        <div className='w-full h-screen rounded-lg flex flex-col bg-base-200'>
                                            <NavLink to={'/dashboard/enroll'}>
                                                <Button startIcon={<GiTeacher />}>My Enroll Classes</Button>
                                            </NavLink>

                                            <NavLink>
                                                <Button startIcon={<PersonIcon />}>Profile</Button>
                                            </NavLink>

                                        </div>
                                    )

                                }
                            </div>
                            <div className='w-3/4 border-2 rounded-lg border-green-500'>
                                <Outlet></Outlet>
                            </div>
                        </div>
                    </div>

            }
        </div>
    )
}

export default Dashboard