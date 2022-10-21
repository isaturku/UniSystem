import React, {useState, useContext} from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function useAuthUpdate(){
    return useContext(AuthUpdateContext);
}

export const AuthProvider = ({children}) =>{
    let user;
    if (localStorage.getItem("jwt") == null)
        user = null;
    else 
        user = {...jwtDecode(localStorage.getItem("jwt")),token:localStorage.getItem("jwt")}
    if(user != null && new Date(user.expires*1000).getTime() < new Date().getTime()){
        user = null;    
    
    }
    const [auth, setAuth] = useState(user);

    function changeAuth(login){
        if(login){
        setAuth(
            {...jwtDecode(localStorage.getItem("jwt")),token:localStorage.getItem("jwt")}
        )}
        else{
            localStorage.removeItem('jwt')
            setAuth(null)
        }
    }
    console.log(auth);
    return(
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={changeAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}