import { Input,Button,Text } from "@nextui-org/react"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useMutation,useQueryClient } from "react-query";


export const Register = ()=>{
    const user = useAuth();
    const queryClient = useQueryClient();  
    const navigate = useNavigate();
    const postUser = async () =>{
        console.log(JSON.stringify(form));
        const response = fetch("http://localhost:8080/api/users",{
            method: 'POST',
            body : JSON.stringify(form),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        return response;
    }

    const [form, setForm] = useState({
        "username": "",
        "pass": "",
        "fName":"",
        "lName":""
      });
      const {mutateAsync: registerUser,status:registerStatus} = useMutation(postUser,{
        onSuccess:() => {queryClient.invalidateQueries('getUsers');navigate("/users");}
    });

    return (
        <div style={{
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "flex-direction":"column",
            "gap":"4rem",
            }}>
                <Text h1>New User </Text>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, fName: e.target.value})}  labelPlaceholder="First Name" size="xl"/>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, lName: e.target.value})}  labelPlaceholder="Last Name" size="xl"/>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, username: e.target.value})}  labelPlaceholder="Username" size="xl"/>
                <Input.Password style={{width:"500px"}}  onChange={e=>setForm({...form, pass: e.target.value})} name ="passowrd"  labelPlaceholder="Password" size="xl"/>
                <Button onPress={registerUser} >Add User</Button>
                
        </div>
    )
}