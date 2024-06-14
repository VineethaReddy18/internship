import './index.css';
import { Link } from 'react-router-dom';
const Header=()=>{
    return(
        <div>
            <div className='flex justify-end bg-blue-500 shadow-xl'>
                <ul className='flex p-4 m-5 text-white'>
                    <li className='px-4 font-bold text-lg'>
                        <Link to="/Home">Home</Link> </li>
                    <li className='px-4 font-bold text-lg'>
                        <Link to="/Dashboard">Dashboard</Link></li>
                    <li className='px-4 font-bold text-lg'>
                        <Link to="/Contact"> Contact</Link></li>
                        <li className='px-4 font-bold text-lg'>
                        <Link to="/track">Track</Link>
                        </li>
                </ul>
            </div>
        </div>
    )
};
export default Header;