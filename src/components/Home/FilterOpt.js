import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

export default function FilterOpt({category, setFiltering, setData, getAllProducts}){
    
    const [selected, setSelected] = useState(false);

    function filter(category){
        if(selected){
            setSelected(false);
            getAllProducts();
            return;
        }
        setSelected(true);
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
        <Options selected={selected}>
            <div onClick={()=>filter(category)}>{category}</div>
        </Options>
    )
}

const Options = styled.div`
cursor:pointer;
div{
    border-radius: 5px;
    border:${props => props.selected ? "2px solid #FFC947" : "2px solid #0A1931"};
    background: ${props => props.selected ? "#FFC947" : "#0A1931" };
    color: ${props => props.selected ? "#0A1931" : "#FFC947" };
    &::-webkit-scrollbar{
        display: none;
    }
}
`