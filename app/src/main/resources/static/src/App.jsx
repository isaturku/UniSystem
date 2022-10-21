import { Navbar, Button, Text,Link, NextUIProvider, Spacer } from "@nextui-org/react";
import { Layout } from './components/layout/Layout.jsx';
import {Logo} from './components/layout/Logo.jsx';
import { NavLink } from 'react-router-dom';
import styles from './styles/style.css';
import { CustomLink } from "./components/CustomLink.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { QueryClientProvider,QueryClient } from 'react-query'
import jwtDecode from "jwt-decode";
import { useAuth,useAuthUpdate } from "./context/AuthContext.jsx";

function App({}) {
  const user = useAuth();
  const changeAuth = useAuthUpdate();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(user);
    navigate("/library")
  },[])
  return (
    <QueryClientProvider client={queryClient}>
    <Layout>
      <Navbar shouldHideOnScroll variant="sticky">
      <Navbar.Brand>
          <Logo />
          <Text b color="inherit" hideIn="xs">
            {user != null ?'Hello, '+ user.name:'Library'}
          </Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline-rounded">
         <CustomLink path="/library">Library</CustomLink>
         {/* <CustomLink path="/recommendations">Recommend a Book</CustomLink> */}
         {user != null && user.role.split(",").includes("ROLE_USER") ? 
         <CustomLink path="/books">My Books</CustomLink>:  ''}
         {user != null && user.role.split(",").includes("ROLE_USER") && !user.role.split(",").includes('ROLE_LIBRARIAN') ? 
         <CustomLink path="/user_recommendations">My Recommendations</CustomLink>:  ''}
        {user != null && user.role.split(",").includes("ROLE_LIBRARIAN") ? 
         <CustomLink path="/recommendations">Recommendations</CustomLink>:  ''}
         {user != null && user.role.split(",").includes("ROLE_ADMIN") ? 
         <CustomLink path="/users">Users</CustomLink>:  ''}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item color="inherit">
            {user == null ?
            <Button auto flat as={Link}>
            <CustomLink path="/login">Login</CustomLink>
            </Button>
            :<>
            <Button auto flat as={Link} onPress={()=>{navigate("/change_pass")}}>
              Change Password
            </Button>
            <Spacer x={1}/>
            <Button auto flat as={Link} onPress={()=>{changeAuth(false);navigate("/library")}}>
            Log Out
            </Button>
          </>
            }
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
    </QueryClientProvider>
  )
}

export default App
