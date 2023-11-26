import { getProjectName } from '../../Utilities/Utilities'
import { SiSkillshare } from "react-icons/si";

function Branding() {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center'>
            <SiSkillshare size={'3em'}></SiSkillshare>
            <h1  className='p-2'>{getProjectName()}</h1>
        </div>
    )
}

export default Branding