import { useAuth } from "../context/AuthContext"
import { useQuery} from "react-query"; 
import { Container,Loading,Button } from "@nextui-org/react";
import { UserCard } from "./UserCard";
import { Link } from "react-router-dom";

export const Users = ()=>{
    const user = useAuth();
    const fetchUsers = async()=>{
        const response = await fetch("http://localhost:8080/api/users",{
            method:"GET",
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        });
        return response.json();
    }
    
    const{data,status} = useQuery('getUsers',fetchUsers);
    
    return(
        <Container xl>
            <Button color="success"><Link style={{"color":"inherit"}} to="/newUser">Create New User</Link></Button>
            {
                status.match('loading')?<div style={{"height":"80vh","display":"flex","justifyContent":"center","alignItems":"center"}}><Loading type="points" size="lg"/></div>:
                 data.map((simpleUser, idx)=>(<UserCard simpleUser={simpleUser}/>))
            }
        </Container>
    );
}