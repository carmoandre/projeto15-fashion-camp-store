import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Card from "./Card";
import UserContext from "../../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";

export default function Home(){
    
    const {user} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [cartEmpty, setCartEmpty] = useState(user?true:true) //mudar isso e checar no ato do login se há carrinho ativo

    useEffect(()=>{
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse.then((answer)=>{
            console.log(answer.data);
            setData(answer.data);
        }).catch((answer)=>console.log(answer.response));
    },[])

    function getAllProducts(){
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse.then((answer)=>{
            console.log(answer.data);
            setData(answer.data);
        }).catch((answer)=>console.log(answer.response));
    }

    return(
        <HomePage>
            <Navbar cartEmpty={cartEmpty} setData={setData}/>
            <Sidebar/>
            <Content>
                { data.length ? 
                    data?.map((card, i)=>{
                        console.log(card);
                        return(<Card key={i} card={card} setCartEmpty={setCartEmpty}/>)
                    }) 
                    
                    : <div className="centralize"><p className="not-found">Nenhum Produto foi Encotrado</p><IoMdArrowRoundBack onClick={getAllProducts} class="back-icon"/></div>
                }
            </Content>
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
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    row-gap: 50px;
    width: 90%;
    height: 100%;
    &::-webkit-scrollbar{
        display: none;
    }
    .centralize{
        width:100%;
        display: flex;
        justify-content: center;
        position: relative;
        .not-found{
            align-self: center;
            color:#FFC947;
            padding-bottom: 150px;
            font-size: 18px;
            &:hover{
                transition: 1000ms;
                padding-bottom: 151px;
                font-size: 19px;
            }
        }
        .back-icon{
            font-size: 28px;
            color:#FFC947;
            position: absolute;
            bottom:40vh;
            cursor: pointer;
            &:hover{
                transition: 1000ms;
                font-size: 48px;
                bottom:39vh;
            }
        }
    }
`