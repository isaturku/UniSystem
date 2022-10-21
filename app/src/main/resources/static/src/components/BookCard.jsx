import { Card,Col,Grid,Text,Badge, Button, Tooltip,Loading } from "@nextui-org/react"
import { useMutation,useQueryClient } from "react-query"
import { useAuth } from "../context/AuthContext"
import classes from "../styles/style.css"


export const BookCard = ({key, book}) =>{
    const user = useAuth();
    const queryClient = useQueryClient();
    const postBorrwing = async ()=>{
        const response = await fetch(`http://localhost:8080/api/loans/borrow/${book.id}`,{
            method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
        return response.text;
    }
    const postShortListing = async ()=>{
        const response = await fetch(`http://localhost:8080/api/loans/shortlist/${book.id}`,{
            method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
        return response.text;
    }
    const link = `https://covers.openlibrary.org/b/olid/${book.olid}-M.jpg`
    const {mutateAsync: borrowBook,status:borrowStatus,data:borrowData} = useMutation(postBorrwing,{
        onSuccess:() => queryClient.invalidateQueries(['books'])
    });
    const {mutateAsync: shortListBook,status:shortListStatus,data:shortlistData} = useMutation(postShortListing,{
        onSuccess:() => queryClient.invalidateQueries(['books'])
        
    });
    return(
        <Grid lg={3}>
        <Card key={book.id} >
            
        <Card.Body css={{ p: 1 }}>
        
        {!book.available ? 
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Badge color="error">Unavailable</Badge>
                </Card.Header>
        : <></>}
            <Card.Image
            src={link}
            objectFit="cover"
            width="100%"
            height={500}
            alt="Card image background"
            />
        </Card.Body>
        <Card.Footer
        isBlurred
        css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
            
        }}
        >
            <Col  css={{
                display:"flex",
                flexDirection:"column",
            alignItems:"center",
            justifyContent:"center"}}>
            <Text color="#000" id="title">
            {book.title}
          </Text>
          <Text color="#000" >
            {book.author}
          </Text>
          <div >
          { book.available ? <Button onPress={borrowBook}>Borrow</Button>
            : user != null &&  book.currentBorrowerId ==  user.sub ? <Button color="success" disabled>Borrowed</Button> 
            :<Tooltip content={`Available on ${new Date(book.availableByDate).toDateString()}`}>
            <Button color="secondary" onPress={shortListBook}>Shortlist</Button> 
            </Tooltip> 
        }</div>
          </Col>
    </Card.Footer>
        </Card>
        </Grid>
    )
}