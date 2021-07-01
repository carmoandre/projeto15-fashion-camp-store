import styled from "styled-components";
import axios from "axios";

export default function FilterOpt({category, setFiltering, setData}){

    function filter(category){
        setFiltering(category);
        const promisse = axios.get(`http://localhost:4000/products?category=${category}`);
        promisse.then((answer)=>{
            console.log(answer.data);
            setData(answer.data);
        }).catch(answer=>{
            console.log(answer.response);
        })
    }

    return(
        <Options>
            <div onClick={()=>filter(category)}>{category}</div>
        </Options>
    )
}

const Options = styled.div`
background: #0A1931;
border-radius: 5px;
border:3px solid #0A1931;
color:#FFC947;
cursor:pointer;
    &:nth-child(1){
        margin-top:20px;
    }
    &::-webkit-scrollbar{
        display: none;
    }
`