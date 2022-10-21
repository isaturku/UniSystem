import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../context/AuthContext";
import { Text,Input,Button, Dropdown } from "@nextui-org/react";
import { useState ,useMemo} from "react";
import { useNavigate } from "react-router";

export const NewBook = () =>{
    const user =useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const postBook = async () =>{
        console.log(JSON.stringify(form));
        const response = fetch("http://localhost:8080/api/books",{
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
        title: '',
        author: '',
        olid:'',
      });
      const {mutateAsync: newBook,status:recommendationStatus} = useMutation(postBook,{
        onSuccess:() => {queryClient.invalidateQueries(['getBooks']); navigate("/library");}
    });

    return (
        <div style={{
            "display":"flex",
            "justifyContent":"center",
            "alignItems":"center",
            "flex-direction":"column",
            "gap":"4rem",
            }}>
                <Text h1>New Book </Text>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, author: e.target.value})}  labelPlaceholder="Author" size="xl"/>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, title: e.target.value})}  labelPlaceholder="Title" size="xl"/>
                <Input style={{width:"550px"}} onChange={e=>setForm({...form, olid: e.target.value})}  labelPlaceholder="OLID(OpenLibrary ID)" size="xl"/>
                <Button onPress={newBook} >New Book</Button>
        </div>
    ) 
}