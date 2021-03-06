import React from 'react';
import './App.css';
import UserContext, {UserContextProvider} from "./components/UserContext/userContext";
import Navbar from "./components/Navbar/navbar";
import Footer from "./components/Footer/footer";
import Home from "./components/Home/home";
import AdminHome from "./components/AdminHome/AdminHome";
import HomeAnnounce from "./components/AnnounceHome/HomeAnnounce";
import UserHome from "./components/UserHome/UserHome";
import HomeSched from './components/Schedule/HomeSched';
import LoginUser from "./components/Auth/loginUser";
import RegisterUser from "./components/Auth/registerUser";
import {
  BrowserRouter as Router,
  Switch,
  Route,
 } from "react-router-dom";


class App extends React.Component<{}, {}> {
  static contextType = UserContext;
  constructor(props: {}) {
    super(props);
    this.state = {
      isAuth: "",
      token: "",
    };
  }

 
  render() {
    return (
      <div className="App">
        <UserContextProvider>
          <Router>
          <>
            <div className = "verticalCenter"> 
              <Navbar />
             
              <Switch>               
                
                <Route path = "/waterloo" component={AdminHome}/>
                <Route path = "/register" component={RegisterUser}/>
                <Route path = "/login" component={LoginUser}/>
                <Route path = "/user" component={UserHome}/>
                <Route path = "/" component={Home}/>

              </Switch>
              
              <Footer/>
             
            </div>
            </>
           
          </Router>
          </UserContextProvider>
          </div>
        );
  }
}

export default App;


{/* <Route path = "/schedule" component={HomeSched}/>
<Route path = "/announcement" component={HomeAnnounce}/> */}

// const App: React.FunctionComponent = () => {
//   
// }

// export default App;








// return (
  //       <Router>
  //         <div>
  //         <Navbar/>
  //           <Switch>
  
  //             <UserContext>
             
  //             <Route>
  //               <LoginUser setToken = {this.props.setToken}/>
  //                </Route>
  //             <Route path = "/login" component = {LoginUser}/>
  //             <Route path ="/register" component = {RegisterUser}/>
  //             <Route path = "/waterloo" component = {AdminHome}/>
  //             <Route path = "/user" component = {UserHome}/>
  //             <Route path = "/schedule" component = {HomeSched}/>
  //             <Route path = "/announcement" component = {HomeAnnounce}/>
  //             <Route path = "/" component = {Home}/>
  //             </UserContext>
  //           </Switch>
  //           <Footer/>
  //         </div>
  //       </Router>
      
  //     );