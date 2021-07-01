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
        <CardStyle>
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
    width: 20%;
    padding:10px;
    max-height:420px;
    border-radius: 8px 8px 6px 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-container{
        border-radius: 8px 8px 0px 0px;
        height: 380px;
        background: #EFEFEF;
        padding:0px 0px;
        width:100%;
        height:100%;
        img{
            border-radius: 8px 8px 0px 0px;
            width:100%;
            height:100%;

        }
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        width:100%;
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
                font-size: 20px;
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
                font-size: 20px;
                background: #FFC947;
                border: 2px solid #FFC947;
                border-radius: 3px;
                color:#0A1931;
                max-height: 25px;
                cursor: default;
            }

        }

    }

    @media(max-width:1320px){  
        .info{
            .others{
                padding:0px 2px;
                .add{
                    font-size: 18px;
                }
                .price{
                    font-size: 18px;
                }
            }
        }
    }
    @media(max-width:1250px){
        .info{
            .others{
                padding:0px 2px;
                .add{
                    font-size: 16px;
                }
            }
        }
    }
    @media(max-width:1180px){
        max-height: 400px;
        width:25%;
        .info{
            .others{
                .add{
                    font-size: 18px;
                }
            }
        }
    }
    @media(max-width:990px){
        .info{
            .others{
                padding:0px 2px;
                .add{
                    font-size: 16px;
                }
            }
        }
    }
    @media(max-width:930px){
        width:33%;
        .info{
            .others{
                padding:0px 1px;
                .add{
                    font-size: 18px;
                }
            }
        }
    }
    @media(max-width:750px){
        width:33%;
        .info{
            .others{
                .add{
                    font-size: 15px;
                }
            }
        }
    }
    @media(max-width:667px){
        width:50%;
        .info{
            .others{
                .add{
                    font-size: 18px;
                }
            }
        }
    }
    @media(max-width:490px){
        max-height: 300px;
        .info{
            .others{
                .add{
                    font-size: 16px;
                }
            }
        }
    }
    @media(max-width:455px){
        .info{
            .name{
                font-size: 14px;
            }
            .others{
                padding:0px 1px 1px 1px;
                .add{
                    width:44px;
                    font-size: 12px;
                    display: inline;
                }
            }
        }
    }
`