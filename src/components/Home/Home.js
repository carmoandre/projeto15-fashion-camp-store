import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Content from "./Content"
import { useEffect, useContext, useState } from "react"
import UserContext from "../../contexts/UserContext"
import styled from "styled-components"
import axios from "axios"

export default function Home(){
    
    const user = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(()=>{
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse.then((answer)=>{
            console.log(answer.data);
            setData(answer.data);
        }).catch((answer)=>console.log(answer.response));
    },[])


    return(
        <HomePage>
            <Navbar/>
            <Sidebar/>
            <Content data={data}/>
        </HomePage>
    )
}

const HomePage = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width:100vw;
    height: 100vh;
    padding-bottom: 15px;
`
