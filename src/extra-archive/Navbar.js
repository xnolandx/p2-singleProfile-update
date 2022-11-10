import { Link, useMatch, useResolvedPath } from "react-router-dom"
import styled from "styled-components"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';




export default function Navbar() {
    const path = window.location.pathname
    return (
        <>
        <div className="main-container">
            <nav className="navbar">
                <Link to="/" className="site-title">
                 
                </Link>

                <ul>
                    <CustomLink to='/' className='cover'>Profile</CustomLink>
                    <CustomLink to='/' className='cover'>Events</CustomLink>
                    <CustomLink to='/mostwanted' className='cover'>Most Wanted</CustomLink>
                    <CustomLink to='/' className='cover'>Teams</CustomLink>
                    <CustomLink to='/about' className='cover'>About Us</CustomLink>
            
                </ul>

             </nav>
     </div>



    
     </>
    )
}


function CustomLink({to, children, ...props}) {
    const resolvedPath = useResolvedPath(to)
    const isActive =useMatch({ path: resolvedPath.pathname, end: true})
    return (
    <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
            {children}
        </Link>
    </li>
    )
}