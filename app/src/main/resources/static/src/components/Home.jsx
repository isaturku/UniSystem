import { Grid, Loading, Pagination, Text,Container } from "@nextui-org/react"
import { BookCard } from "./BookCard"
import { useQuery } from "react-query"
import { useState } from "react"
import { BookContainer } from "./BookContainer"

export const Home = () => {

    const [page, setPage] = useState(0);

    const fetchBooks = async() =>{
        const response = await fetch(`http://localhost:8080/api/books?page=${page}`);
        return response.json();
    }

    const {data,status} = useQuery(['books',page],fetchBooks)

    const fetchCount = async() =>{
        const response = await fetch(`http://localhost:8080/api/books/count`);
        return parseInt(response.text)
    }

    const {data:count ,status: countStatus} = useQuery("count",fetchCount)

    return(
        <>
        <h1 style={{textAlign:"center"}}>Library</h1>
        {
            status.match("loading") ?<div style={{"height":"100vh","display":"flex","justifyContent":"center","alignItems":"center"}}><Loading type="points" size="lg"/></div>:
            status.match("error") ? <Text>Error</Text> :
            <BookContainer books={data}/>
        }
        <div style={{"display":"flex"}}><Pagination css={{margin:"1rem auto "}} noMargin shadow total={countStatus.match("sucess") ? Math.floor(count/20):25} initialPage={1}  onChange={(page)=>{setPage(page-1)}}/></div>
        </>
    )
}