import styled from "styled-components"
import { useContext } from "react";
import UserContext from "../../contexts/UserContext"
import { MdAddShoppingCart } from "react-icons/md";
import { useHistory } from "react-router";
import axios from "axios";


export default function Card({card, setCartEmpty, setCartSize, cartSize}){
    const {user} = useContext(UserContext);
    const history = useHistory();
    
    function addToCart(){
        if(card.quantity <= 0 || card.quantity === "0"){
            return;
        }
        if(!user){
            return history.push("/sign-in");
        }
        const config = {headers: {"Authorization": `Bearer ${user.token}` } };
        const promisse = axios.post(`http://localhost:4000/product/add/${card.id}`,{},config,);
        promisse.then((answer)=>{
            setCartEmpty(false);
            console.log(answer);
        }).catch((answer)=>{
            console.log(answer.response);
        });
    }

    return(
        <>
        <CardStyle qntd={card.quantity}>
            {card.quantity <= 0 || card.quantity === "0" ? <div className="out-of-stock"><p>Produto sem estoque</p></div> : <></> }
            <div className="img-container">
                <img src={card.image} alt="roupa"/>
            </div>
            <div className="info">
                <div className="name">{card.name}</div>
                <div className="others">
                    <span className="add" onClick={addToCart}>Add to Cart <MdAddShoppingCart className="add-icon"/></span>
                    <span className="price">R${(card.value/100).toFixed(2).replace(".",",")}</span>
                </div>
            </div>
        </CardStyle>
        </>
    )
}

const CardStyle = styled.div`
    padding:10px;
    border-radius: 8px 8px 6px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    .out-of-stock{
        position:absolute;
        background:#EFEFEF;
        opacity:100%;
        width:auto;
        height:auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .img-container{
        border-radius: 8px 8px 0px 0px;
        width: 250px;
        height: 300px;
        overflow: hidden;
        background: #EFEFEF;
        padding:0px 0px;
        img{
            border-radius: 8px 8px 0px 0px;
            width:100%;
            height: 100%;
            opacity: ${props => props.qntd <= 0 || props.qntd === "0" ? "60%" : "100%"};
        }
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width:250px;
        min-height:85px;
        border-radius: 0px 0px 5px 5px;
        background: #EFEFEF;
        padding:1px 3px;
        .name{
            padding:4px 0px 0px 0px;
            margin-bottom: 2px;
            min-height: 40px;
            max-height: 50px;
            font-weight: bold;
            color:#0A1931;
            overflow: scroll;
            &::-webkit-scrollbar{
                display: none;
            }
        }
        .others{
            margin:3px 0px 3px 0px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .add{
                font-size: 19px;
                background: #0A1931;
                border: 2px solid #0A1931;
                border-radius: 3px;
                color:#FFC947;
                align-self: center;
                display: flex;
                align-items:flex-end;
                cursor: pointer;
            }
            .price{
                align-self: center;
                font-size: 16px;
                background: #FFC947;
                border: 2px solid #FFC947;
                border-radius: 3px;
                color:#0A1931;
                max-height: 25px;
                cursor: default;
            }

        }

    }
    @media(max-width:900px){
        .img-container{
            width:220px;
            height:250px;
        }
        .info{
            width:220px;
        }
    }
    @media(max-width:535px){
        .img-container{
            width:200px;
            height:230px;
        }
        .info{
            width:200px;
            .others{
                .add{
                    font-size: 16px;
                }
                .price{
                    font-size: 14px;
                }
            }
        }
    }
    @media(max-width:535px){
        .img-container{
            width:180px;
            height:200px;
        }
        .info{
            width:180px;
        }
    }
`