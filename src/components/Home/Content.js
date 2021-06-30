import styled from "styled-components"
import Card from "./Card";

export default function Content({data}){
    return(
        <ContentStyle>
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
            {data?.map((card, i)=>{
                console.log(card);
                return(<Card key={i} card={card}/>)
            })}
        </ContentStyle>
    )
}

const ContentStyle = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    row-gap: 50px;
    width: 90%;
    height: 100%;
    &::-webkit-scrollbar{
        display: none;
    }
`