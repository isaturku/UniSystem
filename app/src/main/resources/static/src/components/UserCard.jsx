import { useAuth } from "../context/AuthContext";
import {Card,Text, Col,Row,Button} from "@nextui-org/react";
import { useMutation,useQueryClient } from "react-query";

export const UserCard = ({simpleUser})=>{
    const user = useAuth();
    const queryClient = useQueryClient();
    const deleteUser = async ()=>{
        const response = await fetch(`http://localhost:8080/api/users/${simpleUser.username}`,{
            method:'DELETE',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            });
        return response.text;
    }
    const {mutateAsync: del,status:deleteStatus} = useMutation(deleteUser,{
        onSuccess:() => queryClient.invalidateQueries('getUsers')
    });
    return(
        <Card style={{"margin":"3rem","padding":"2rem"}}><Row>
                    <Col>
                    <Text lg>Username</Text>
                    <Text lg>{simpleUser.username}</Text>
                    </Col>
                    <Col>
                    <Text lg>Full Name</Text>
                    <Text lg>{simpleUser.firstName +" "+ simpleUser.lastName}</Text>
                    </Col>
                    <Col>
                    <Button color="error" onPress={del}>Delete</Button>
                    </Col>
                    </Row></Card>
    );

}