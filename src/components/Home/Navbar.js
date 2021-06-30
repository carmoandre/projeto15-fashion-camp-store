import styled from "styled-components";
import { useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import { IoCart, IoCartOutline, IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { RiFilterFill, RiFilterLine } from "react-icons/ri";

export default function Navbar(){

    const filtering = false;
    const searching = false;
    const cartEmpty = true;

    const user = useContext(UserContext);

    return(
        <>
        <NavbarTop>
            <div>
                <span>Fashion Camp</span>
                { !true ?
                <>
                    <span>{user.name?.split(" ")[0]}</span>
                    <span><IoLogOutOutline/></span>
                </>:
                <span>
                    <span className="sign-menu">Sign-in |</span>
                    <span className="sign-menu"> Sign-up</span>
                </span>
                }
            </div>
        </NavbarTop>
        <NavbarBottom>
            <div>                
                { filtering ? <RiFilterFill className="icon"/> : <RiFilterLine className="icon"/> }
                { searching ? <input className="search" placeholder="pesquisar"></input> : <IoSearch/> }
                { cartEmpty? <IoCartOutline className="icon"/> : <IoCart className="icon"/> }
            </div>
        </NavbarBottom>
        </>
    )
}

const NavbarBottom = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    color: #FFC947;
    /* background: green; */
    &>div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 100%;
        font-size: 20px;
        padding: 30px 20px;
    }
    .search{
        border-style: none;
        outline-style:none;
        background:#185ADB;
        color:#EFEFEF;
        border-radius: 5px;
        height:25px;
        &::placeholder{
            text-align: center;
            color:#EFEFEF;
        }
    }
`

const NavbarTop = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    height:80px;
    color: #FFC947;
    /* background: red; */
    &>div{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #FFC947;
        width: 90%;
        height: 100%;
        font-size: 28px;
        padding: 25px 20px 0px 20px;
    }
    .sign-menu{
        font-size: 17px;
        cursor: pointer;
    }
`

