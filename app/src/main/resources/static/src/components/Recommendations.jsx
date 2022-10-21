import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"; 
import { Button,Card,Col,Container,Grid,Spacer,Text,Loading,Pagination,Image,Row,Input, Textarea } from "@nextui-org/react";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { RecommendationContainer } from "./RecommendationContainer";

export const Recommendations = () =>{
    const user = useAuth();
    const [page, setPage] = useState(0);

    const fetchRecommendations = async() =>{
        const response = await fetch(`http://localhost:8080/api/recommendations?page=${page}`,{
            headers:{
                'Authorization' :`Bearer ${user.token}`
            }
        });
        const response1 = response.json(); 
        return response1;
    }


    const {data,status} = useQuery(['getRecommendations',page],fetchRecommendations);


    return(
        <>
        <Button><Link to="/new_book" style={{"color":"inherit"}}>New Book</Link></Button>
        <Spacer y={1}/>
        <div style={{"minHeight":"80vh","display":"flex","flexDirection":"column"}}>
            
        {status.match('loading') ? <Loading type="points"/> :
            data.map((recommendation)=>(
            <RecommendationContainer recommendation={recommendation} ></RecommendationContainer>
            ))
        }
        </div>
        <div style={{"display":"flex"}}><Pagination css={{margin:"1rem auto "}} noMargin shadow total={25} initialPage={1}  onChange={(page)=>{setPage(page-1)}}/></div>
        </>
    );

}