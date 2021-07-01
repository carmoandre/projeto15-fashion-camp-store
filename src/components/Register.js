import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import { Logo } from "./reusable/Logo";
import { GenericInput } from "./reusable/GenericInput";
import { GenericButton } from "./reusable/GenericButton";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [disabled, setDisabled] = useState(false);
    const history = useHistory();

    const loadEffect = (
        <Loader type="ThreeDots" color="#fff" height={45} width={80} />
    );

    function registerUser(event) {
        event.preventDefault();

        setDisabled(true);

        if (password !== confirmPassword) {
            alert(
                "A senha e sua confirmação estão diferentes. Elas devem coincidir"
            );
            setDisabled(false);
            return;
        }

        const body = { name, email, password };

        const request = axios.post(
            "http://localhost:4000/fashioncamp/sign-up",
            body
        );
        request.then((response) => {
            setDisabled(false);
            history.push("/sign-in");
        });
        request.catch((error) => {
            alert("Não foi possível realizar o cadastro.");
            setDisabled(false);
        });
    }
    return (
        <FlexEffect>
            <Logo>Fashion Camp</Logo>
            <Form onSubmit={registerUser}>
                <GenericInput
                    type="name"
                    placeholder="Nome"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={disabled}
                />
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
                <GenericInput
                    type="password"
                    placeholder="Confirme a senha"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={disabled}
                />
                <GenericButton type="submit" disabled={disabled}>
                    {disabled ? loadEffect : `Cadastrar`}
                </GenericButton>
            </Form>
            <Link to="/sign-in">
                <Suggestion>Já tem uma conta? Entre agora!</Suggestion>
            </Link>
        </FlexEffect>
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
    &:hover{
        font-size: 16px;
    }
`;
