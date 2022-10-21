import { Input,Button,Text, changeTheme } from "@nextui-org/react"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "react-query";


export const ChangePass = ()=>{
    const navigate = useNavigate();
    const user = useAuth();
    const putPassword = async () =>{
        console.log(`Bearer ${user.token}`)
        console.log(newPassword);
        const response = await fetch(`http://localhost:8080/api/users`,{
            method: 'PUT',
            body : newPassword,
            headers:{
                'Authorization' :`Bearer ${user.token}`
            }
    })
    }
    const {mutateAsync:changePass} = useMutation(putPassword,{
        onSuccess:() =>{navigate('/library')}
    });

    const [newPassword, setNewPassword] = useState('');
    

    return (
        <div style={{
            "height":"80vh",
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "flex-direction":"column",
            "gap":"4rem",
            }}>
                <Text h1>New Password  </Text>
                <Input.Password style={{width:"500px"}}  onChange={e=>setNewPassword(e.target.value)} name ="passowrd"  labelPlaceholder="Password" size="xl"/>
                <Button onPress={changePass}>Change Password</Button>
                
        </div>
    )
}