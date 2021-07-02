import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";
import { GenericInput } from "./reusable/GenericInput";
import { GenericButton } from "./reusable/GenericButton";
import { Logo } from "./reusable/Logo";
import CartModal from "./cart/CartModal";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    const loadEffect = (
        <Loader type="ThreeDots" color="#fff" height={45} width={80} />
    );

    const localStorageUser = localStorage.getItem("user");

    useEffect(() => {
        if (localStorageUser) {
            setUser(JSON.parse(localStorageUser));
            history.push("/");
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function logUser(event) {
        event.preventDefault();

        setDisabled(true);

        const body = { email, password };

        const request = axios.post(
            "http://localhost:4000/fashioncamp/sign-in",
            body
        );
        request.then((response) => {
            setUser(response.data);
            const stringUser = JSON.stringify(response.data);
            localStorage.setItem("user", stringUser);
            setDisabled(false);
            history.push("/");
        });
        request.catch((error) => {
            alert("Usuário ou senha inválidos");
            setDisabled(false);
        });
    }

    return (
        <>
            <FlexEffect>
                <Logo>Fashion Camp</Logo>
                <Form onSubmit={logUser}>
                    <GenericInput
                        type="email"
                        placeholder="E-mail"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disabled}
                    />
                    <GenericInput
                        type="password"
                        placeholder="Senha"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={disabled}
                    />
                    <GenericButton type="submit" disabled={disabled}>
                        {disabled ? loadEffect : `Entrar`}
                    </GenericButton>
                </Form>
                <Link to="/sign-up">
                    <Suggestion>Primeira vez? Cadastre-se!</Suggestion>
                </Link>
            </FlexEffect>
            <CartModal />{" "}
            {/*CartModal deve estar na pagina principal o state 
            e a função toglleModal também, e devem ser passadas por props pra cartModal */}
        </>
    );
}

const FlexEffect = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 50px);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    max-width: 400px;
`;

const Suggestion = styled.p`
    font-weight: 700;
    color: #efefef;
    font-size: 15px;
    line-height: 18px;
    margin-top: 36px;
`;
