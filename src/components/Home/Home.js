import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Card from "./Card";
import UserContext from "../../contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import styled from "styled-components";
import axios from "axios";
import CartModal from "../cart/CartModal";
import { useHistory } from "react-router-dom";

export default function Home() {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [cartEmpty, setCartEmpty] = useState(true);
    const [modalIsOpen, setModalIsOPen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse
            .then((answer) => {
                console.log(answer.data);
                setData(answer.data);
            })
            .catch((answer) => console.log(answer.response));
    }, []);

    function getAllProducts() {
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse
            .then((answer) => {
                console.log(answer.data);
                setData(answer.data);
            })
            .catch((answer) => console.log(answer.response));
    }

    function toggleModal() {
        if (!user) {
            history.push("/sign-in");
            return;
        }
        modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
    }

    return (
        <>
            <HomePage>
                <Navbar
                    cartEmpty={cartEmpty}
                    setData={setData}
                    toggleModal={toggleModal}
                />
                <Sidebar />
                <Content>
                    {data.length ? (
                        data?.map((card, i) => {
                            console.log(card);
                            return (
                                <Card
                                    key={i}
                                    card={card}
                                    setCartEmpty={setCartEmpty}
                                />
                            );
                        })
                    ) : (
                        <div className="centralize">
                            <p className="not-found">
                                Nenhum Produto foi Encotrado
                            </p>
                            <IoMdArrowRoundBack
                                onClick={getAllProducts}
                                className="back-icon"
                            />
                        </div>
                    )}
                </Content>
            </HomePage>
            <CartModal toggleModal={toggleModal} modalIsOpen={modalIsOpen} />
        </>
    );
}

const HomePage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-bottom: 15px;
`;
const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    justify-content: center;
    row-gap: 50px;
    width: 90%;
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
    .centralize {
        width: 100%;
        display: flex;
        justify-content: center;
        position: relative;
        .not-found {
            align-self: center;
            color: #ffc947;
            padding-bottom: 150px;
            font-size: 18px;
            &:hover {
                transition: 1000ms;
                padding-bottom: 151px;
                font-size: 19px;
            }
        }
        .back-icon {
            font-size: 28px;
            color: #ffc947;
            position: absolute;
            bottom: 40vh;
            cursor: pointer;
            &:hover {
                transition: 1000ms;
                font-size: 48px;
                bottom: 39vh;
            }
        }
    }
`;
