import React from 'react';
import './App.css';
import {UserContextProvider} from "./components/UserContext/userContext";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import AdminHome from "./components/AdminHome/AdminHome";
import HomeAnnounce from "./components/AnnounceHome/HomeAnnounce";

import {
  BrowserRouter as Router,
  Switch,
  Route,
 } from "react-router-dom";
import HomeSched from './components/Schedule/HomeSched';

 
const App: React.FunctionComponent = () => {
  return (
    <Router>
    <div className="App">
      <div className = "verticalCenter">
        <UserContextProvider>
        <Navbar />
        <Switch>
          <Route path = "/user">
            {/* <UserHome/> */}
          </Route>
          <Route path = "/waterloo">
             <AdminHome/> 
          </Route>
          <Route path = "/user/register">
          
          </Route>
          <Route path = "/schedule">
            <HomeSched/>
          
          </Route>
          <Route path = "/announcement">
            <HomeAnnounce/>
          
          </Route>


          <Route path = "/">
            <Home/>
          </Route>
        </Switch>
        
          
        <Footer/>
      </UserContextProvider>
      </div>
    </div>
    </Router>
  );
}

export default App;
