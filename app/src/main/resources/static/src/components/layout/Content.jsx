import { Text, Spacer } from "@nextui-org/react"
import { Route, Routes } from "react-router-dom";
import { Box } from "./Box.jsx"
import { Home } from "../Home.jsx";
import { Recommendations } from "../Recommendations.jsx";
import { Login } from "../Login.jsx";
import { Books } from "../Books.jsx";
import { Users } from "../Users.jsx";
import {Register} from "../Register"
import { UserRecommendations } from "../UserRecommendations.jsx";
import { NewRecommendation } from "../NewRecommendation.jsx";
import { NewBook } from "../NewBook.jsx";
import { ChangePass } from "../ChangePass.jsx";

export const Content = () => (
  <Box css={{px: "$12", mt: "$8", "@xsMax": {px: "$10"}}}>
    <Routes>
      <Route path="/library" element ={<Home/>} />
      <Route path="/recommendations" element ={<Recommendations/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/newUser" element={<Register/>}/>
      <Route path="/user_recommendations" element={<UserRecommendations/>}/>
      <Route path="/new_recommendation" element={<NewRecommendation/>}/>
      <Route path="/new_book" element={<NewBook/>}/>
      <Route path="/change_pass" element={<ChangePass/>}/>
    </Routes>
  </Box>
);
