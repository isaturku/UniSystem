import { LoanContainer } from "./LoanContainer"
import { useQuery } from "react-query"
import { useAuth } from "../context/AuthContext"
import { Collapse, Loading,Text } from "@nextui-org/react"




export const Books = ()=>{
    const user = useAuth();
    const fetchLoans = async()=>{
        const response = await fetch("http://localhost:8080/api/loans/current",{
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        });
        return response.json();
    }
    const fetchShortlistings = async()=>{
        const response = await fetch("http://localhost:8080/api/loans/future",{
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        });
        return response.json();
    }
    const fetchPreviousLoans = async()=>{
        const response = await fetch("http://localhost:8080/api/loans/previous",{
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        });
        return response.json();
    }
    const {data :currentData, status :currentStatus} = useQuery('loans',fetchLoans);
    const {data :previousData, status :previousStatus} = useQuery('previousLoans',fetchPreviousLoans);
    const {data : futureData, status :futureStatus} = useQuery('shortlistings',fetchShortlistings);
    return(
        <>
        <Collapse.Group>
        <Collapse title="Currently Borrowed Books">
        {
         currentStatus.match("loading") ?<div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><Loading type="points" size="lg"/></div>:
            currentStatus.match("error") ? <Text>Error</Text> :
            <LoanContainer loans={currentData}/>
        }
        </Collapse>
        <Collapse title="Shortlistings">
        {
         futureStatus.match("loading") ?<div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><Loading type="points" size="lg"/></div>:
            futureStatus.match("error") ? <Text>Error</Text> :
            <LoanContainer loans={futureData} color="purple"/>
        }
        </Collapse>
        <Collapse title="Previously borrowed Books">
        {
         previousStatus.match("loading") ?<div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}><Loading type="points" size="lg"/></div>:
            previousStatus.match("error") ? <Text>Error</Text> :
            <LoanContainer loans={previousData} color="green"/>
        }
        </Collapse>
        </Collapse.Group>
        </>
    )
}