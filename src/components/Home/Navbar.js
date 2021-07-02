import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import {
    IoCart,
    IoCartOutline,
    IoLogOutOutline,
    IoSearch,
} from "react-icons/io5";
import { RiFilterFill, RiFilterLine } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import FilterOpt from "./FilterOpt";
import axios from "axios";

export default function Navbar({ cartEmpty, setData, toggleModal }) {
    const [filtering, setFiltering] = useState(false);
    const [searching, setSearching] = useState(false);
    const [categories, setCategories] = useState([]);

    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    function logout() {
        setUser(null);
        // apagar localStorage
        history.push("/sign-in");
    }

    function showCategories() {
        setFiltering(true);
        const promisse = axios.get("http://localhost:4000/categories");
        promisse
            .then((answer) => {
                console.log(answer.data);
                setCategories(answer.data);
            })
            .catch((answer) => {
                console.log(answer.response);
            });
    }

    function stopFilter() {
        setFiltering(false);
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse
            .then((answer) => {
                console.log(answer.data);
                setData(answer.data);
            })
            .catch((answer) => {
                console.log(answer.response);
            });
    }

    function search(e) {
        e.preventDefault();
        const promisse = filtering
            ? axios.get(
                  `http://localhost:4000/products?search=${searching}&category=${filtering}`
              )
            : axios.get(`http://localhost:4000/products?search=${searching}`);
        promisse
            .then((answer) => {
                setSearching(false);
                console.log(answer.data);
                setData(answer.data);
            })
            .catch((answer) => {
                setSearching(false);
                console.log(answer.response);
            });
    }

    function getAllProducts() {
        const promisse = axios.get(`http://localhost:4000/products`);
        promisse
            .then((answer) => {
                console.log(answer.data);
                setData(answer.data);
            })
            .catch((answer) => console.log(answer.response));
    }

    return (
        <>
            <NavbarTop>
                <div>
                    <span onClick={getAllProducts} className="logo">
                        Fashion Camp
                    </span>
                    {user ? (
                        <span className="log-menu">
                            <span className="username">
                                Olá, {user.name?.split(" ")[0]}
                            </span>
                            <span>
                                <IoLogOutOutline
                                    onClick={logout}
                                    className="logout"
                                />
                            </span>
                        </span>
                    ) : (
                        <span className="unlogged-menu">
                            <span
                                onClick={() => history.push("/sign-in")}
                                className="sign-menu"
                            >
                                Sign-in <span className="vanish">|</span>
                            </span>
                            <span
                                onClick={() => history.push("/sign-up")}
                                className="sign-menu"
                            >
                                {" "}
                                Sign-up
                            </span>
                        </span>
                    )}
                </div>
            </NavbarTop>
            <NavbarBottom>
                <div>
                    {searching ? (
                        <form onSubmit={search}>
                            <input
                                className="search"
                                placeholder="pesquisar"
                                value={searching}
                                onChange={(e) => setSearching(e.target.value)}
                            ></input>
                        </form>
                    ) : (
                        <IoSearch
                            onClick={() => setSearching(" ")}
                            className="search-icon"
                        />
                    )}
                    {filtering ? (
                        <RiFilterFill
                            onClick={stopFilter}
                            className="filtering"
                        />
                    ) : (
                        <RiFilterLine
                            onClick={showCategories}
                            className="filtering"
                        />
                    )}
                    {cartEmpty ? (
                        <IoCartOutline className="cart" onClick={toggleModal} />
                    ) : (
                        <IoCart className="cart filled" onClick={toggleModal} />
                    )}
                </div>
            </NavbarBottom>
            <Filter filtering={filtering}>
                {categories.map((category, i) => (
                    <FilterOpt
                        key={i}
                        category={category}
                        setFiltering={setFiltering}
                        setData={setData}
                        getAllProducts={getAllProducts}
                    />
                ))}
            </Filter>
        </>
    );
}

const Filter = styled.div`
    display: ${(props) => (props.filtering ? "flex" : "none")};
    row-gap: 2px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    width: 200px;
    height: 35px;
    overflow: scroll;
    border-radius: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
    background: #efefef;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const NavbarBottom = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    height: 40px;
    color: #ffc947;
    /* background: green; */
    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;
        height: 100%;
        font-size: 20px;
        padding: 30px 20px;
        .cart {
            position: absolute;
            left: calc(93.5vw - 30px);
            font-size: 22px;
            &:hover {
                transition: 500ms;
                font-size: 26px;
            }
        }
        .cart.filled {
            position: absolute;
            left: calc(93.5vw - 30px);
            cursor: pointer;
            font-size: 28px;
            &:hover {
                transition: 500ms;
                font-size: 32px;
            }
        }
        .filtering {
            position: absolute;
            left: 49vw;
            &:hover {
                transition: 500ms;
                font-size: 26px;
            }
        }
        .search-icon {
            &:hover {
                transition: 500ms;
                font-size: 26px;
            }
        }
    }
    .search {
        border-style: none;
        outline-style: none;
        background: #efefef;
        color: #0a1931;
        padding-left: 8px;
        border-radius: 5px;
        width: 25vw;
        height: 20px;
        &::placeholder {
            text-align: center;
            color: #efefef;
        }
    }
    .search.hidden {
        display: none;
    }
`;

const NavbarTop = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 80px;
    color: #ffc947;
    /* background: red; */
    & > div {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ffc947;
        width: 90%;
        height: 100%;
        font-size: 28px;
        padding: 25px 20px 0px 20px;
        .logo {
            font-family: "Permanent Marker", cursive;
            cursor: pointer;
            &:hover {
                font-size: 30px;
            }
        }
        .log-menu {
            display: flex;
            justify-content: space-between;
            /* align-items: center; */
            column-gap: 1vw;
            .logout {
                cursor: pointer;
            }
            .username {
                cursor: default;
                padding-top: 5px;
                font-size: 20px;
            }
        }
    }
    .sign-menu {
        font-size: 19px;
        cursor: pointer;
    }

    @media (max-width: 450px) {
        & > div {
            padding: 25px 5px 0px 5px;
            .logo {
                font-size: 24px;
            }
            .log-menu {
                font-size: 27px;
                .username {
                    font-size: 18px;
                }
            }
        }
    }
    @media (max-width: 450px) {
        & > div {
            position: relative;
        }
        .unlogged-menu {
            position: absolute;
            right: 5px;
            top: 10px;
            display: flex;
            flex-direction: column;
            row-gap: 6px;
            .sign-menu {
                font-size: 14px;
            }
            span:nth-child(1) {
                border-bottom: 1px solid #ffc947;
                padding-bottom: 10px;
            }
        }
        .vanish {
            display: none;
        }
    }
`;
