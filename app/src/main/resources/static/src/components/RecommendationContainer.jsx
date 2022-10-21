import { Button,Card,Col,Container,Grid,Spacer,Text,Loading,Pagination,Image,Row,Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useMutation,useQueryClient } from "react-query";
import { useAuth } from "../context/AuthContext";

export const RecommendationContainer = ({recommendation})=>{
    const user = useAuth();
    const queryClient = useQueryClient();
    const [reason, setReason] = useState('');
    const putRecommendationTrue = async() =>{
        const response = await fetch(`http://localhost:8080/api/recommendations/${recommendation.id}?status=accepted&reason=${reason}`,{
            method:'PUT',
            headers:{
                'Authorization' :`Bearer ${user.token}`
            }
        });
        return response;
    }
    const putRecommendationFalse = async() =>{
        const response = await fetch(`http://localhost:8080/api/recommendations/${recommendation.id}?status=rejected&reason=${reason}`,{
            method:'PUT',
            headers:{
                'Authorization' :`Bearer ${user.token}`
            }
        });
        return response;
    }
    const {mutateAsync: accept,status:recommendationStatusTrue} = useMutation(putRecommendationTrue,{
        onSuccess:() => queryClient.invalidateQueries(['getRecommendations'])
    });
    const {mutateAsync: reject,status:recommendationStatusFalse} = useMutation(putRecommendationFalse,{
        onSuccess:() => queryClient.invalidateQueries(['getRecommendations'])
    });
    console.log(recommendation);

    return(
            <Container lg>
            <Col>
            <Card key={recommendation.id} color={recommendation.status =='rejected'?"red": recommendation.status =='accepted' ?"green":"white"}>
                <Card.Body>
                    <Grid.Container>
                        <Grid xs={12} md={4}>
                        <Image src={`https://covers.openlibrary.org/b/olid/${recommendation.olid}-M.jpg`} height="250px"/>
                        </Grid>
                        <Grid xs={12} md={4}>
                            <Col>
                            <Text size="$2xl">
                                {recommendation.title}
                            </Text>
                            <Text size="$l">
                                {recommendation.author}
                            </Text>
                            </Col>
                        </Grid>
                        <Grid xs={12} md={4}>
                            {recommendation.status.match('waiting') ?
                            <Col>
                            <Row>
                                <Button color="success" onPress={accept}>Accept</Button>
                                <Spacer x={1}/>
                                <Button color="error" onPress={reject}>Reject</Button>
                            </Row>
                            <Spacer y={1}/>
                            <Textarea label="Reason if rejected: " onChange={(e)=>{setReason(e.target.value)}} width="100%"/>
                            </Col>: recommendation.status.match('rejected') ? <Text>Rejected</Text>:<Text>Accepted</Text>}
                        </Grid>
                    </Grid.Container>
                </Card.Body>
            </Card>
            <Spacer y={1}/>
            </Col>
        </Container>)
}