import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"; 
import { Button,Card,Col,Container,Grid,Spacer,Text,Loading,Pagination,Image } from "@nextui-org/react";
import { useQuery } from "react-query";
import { useState } from "react";

export const UserRecommendations = () =>{
    const user = useAuth();
    const [page, setPage] = useState(0);

    const fetchRecommendations = async() =>{
        const response = await fetch(`http://localhost:8080/api/recommendations/user?page=${page}`,{
            headers:{
                'Authorization' :`Bearer ${user.token}`
            }
        });
        const response1 = response.json(); 
        console.log(response1);
        return response1;
    }

    const {data,status} = useQuery(['userRecommendations',page],fetchRecommendations);

    return(
        <>
        <Button><Link to="/new_recommendation" style={{"color":"inherit"}}>Make a Suggestion</Link></Button>
        <Spacer y={1}/>
        <div style={{"minHeight":"80vh","display":"flex","flexDirection":"column"}}>
            
        {status.match('loading') ? <Loading type="points"/> :
            data.map((loan, index)=>(
            <Container lg>
            <Col>
            <Card key={index} color={data.rejected == true ?"red": data.rejected == false ?"green":"white"}>
                <Card.Body>
                    <Grid.Container>
                        <Grid xs={3}>
                        <Image src={`https://covers.openlibrary.org/b/olid/${loan.olid}-M.jpg`} height="250px"/>
                        </Grid>
                        <Grid xs={8}>
                            <Col>
                            <Text size="$2xl">
                                {loan.title}
                            </Text>
                            <Text size="$l">
                                {loan.author}
                            </Text>
                            </Col>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
            </Card>
            <Spacer y={1}/>
            </Col>
        </Container>
            ))
        }
        </div>
        <div style={{"display":"flex"}}><Pagination css={{margin:"1rem auto "}} noMargin shadow total={25} initialPage={1}  onChange={(page)=>{setPage(page-1)}}/></div>
        </>
    );

}