import styled from "styled-components";

const GenericInput = styled.input`
    padding: 0 15px;
    width: 100%;
    height: 58px;
    border-radius: 5px;
    border: none;
    margin-bottom: 13px;
    font-size: 20px;
    color: #000;
    outline: none;
    &::placeholder {
        color: #000;
    }
`;

export { GenericInput };
