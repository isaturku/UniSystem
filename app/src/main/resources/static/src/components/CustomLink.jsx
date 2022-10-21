import {Navbar, Link } from "@nextui-org/react"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

export const  CustomLink = ({path,children})=>{
    const [active, setActive] = useState(0);
    return(
    <Navbar.Link isActive={active}> <NavLink style={({isActive}) =>{setActive(isActive); return {color:"inherit"}}} to={path}>{children}</NavLink></Navbar.Link>
    )
}