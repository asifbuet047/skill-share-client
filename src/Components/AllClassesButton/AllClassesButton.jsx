import { NavLink } from 'react-router-dom';


function AllClassesButton() {
    return (
        <div className='p-2'>
            <NavLink to='/allclasses'><span>All Classes</span></NavLink>
        </div>
    )
}

export default AllClassesButton