import { Input,Button,Text } from "@nextui-org/react"
import { useState } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { useAuthUpdate,useAuth } from "../context/AuthContext";


export const Login = ()=>{
    const navigate = useNavigate();
    const changeAuth = useAuthUpdate();
    const getToken = async (f) =>{
        const response = await fetch("http://localhost:8080/api/auth",{
            method: 'POST',
            body : JSON.stringify(f),
            headers:{
                'Content-type':'application/json'
            }
        })
        if(!response.ok){
            setAuthFailed(true);
            return;
        }
        const token =  await response.text()
        if(token != null){
            localStorage.setItem("jwt",token);
            changeAuth(true);
            navigate("/library");
        }
    }

    const [form, setForm] = useState({
        userName: '',
        userPassword: '',
      });
    const [authFailed, setAuthFailed] = useState(false);
    

    return (
        <div style={{
            "height":"80vh",
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "flex-direction":"column",
            "gap":"4rem",
            }}>
                <Text h1>Login </Text>
                {authFailed ? <Text blockquote style={{"backgroundColor":"red","width":"550px","textAlign":"center"}} color="white" >Wrong Credentials!</Text>:''}
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, userName: e.target.value})}  name="username" labelPlaceholder="Username" size="xl"/>
                <Input.Password style={{width:"500px"}}  onChange={e=>setForm({...form, userPassword: e.target.value})} name ="passowrd"  labelPlaceholder="Password" size="xl"/>
                <Button onPress={getToken.bind(this,form)}>Login</Button>
                
        </div>
    )
}