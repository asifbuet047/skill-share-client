import React from 'react'
import Branding from '../Branding/Branding'
import HomeButton from '../HomeButton/HomeButton'
import AllClassesButton from '../AllClassesButton/AllClassesButton'
import TeachButton from '../TeachButton/TeachButton'
import SigninRegistrationButton from '../SigninRegistrationButton/SigninRegistrationButton'
import { Divider } from '@mui/material'


function NavigationBar() {
    return (
        <div className='flex flex-col md:flex-row justify-between border-2 rounded-lg'>
            <div className=''>
                <Branding></Branding>
                
            </div>
            <div className='flex flex-col justify-center items-center md:flex-row'>
                <HomeButton></HomeButton>
                <Divider orientation='vertical'></Divider>
                <AllClassesButton></AllClassesButton>
                <Divider orientation='vertical'></Divider>
                <TeachButton></TeachButton>
                <Divider orientation='vertical'></Divider>
                <SigninRegistrationButton></SigninRegistrationButton>
            </div>
        </div>
    )
}

export default NavigationBar