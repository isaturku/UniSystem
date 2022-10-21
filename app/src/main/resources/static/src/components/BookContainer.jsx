import { Grid,Container } from "@nextui-org/react"
import { BookCard } from "./BookCard"

export const BookContainer = ({books})=>{
    return(
    <Grid.Container gap={2} justify="center">
        {
        books.map((book,index)=>(<BookCard key={index} book={book}/>))
        }
    </Grid.Container>);
}