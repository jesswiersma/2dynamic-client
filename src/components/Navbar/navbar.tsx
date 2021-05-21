import React from "react";
import UserContext from "../UserContext/userContext";
import { Container, Paper, Button, Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import RegisterUser from "../Auth/registerUser";
import LoginUser from "../Auth/loginUser";
import appLogo from "../assets/appLogo.png";


interface IMenuProps {
   setToken: (newToken: string) => void
  //token: string,
}

interface IMenuState {
  anchorEl: null | HTMLElement;
  
}

class NavBar extends React.Component<any, IMenuState> {
  static contextType = UserContext;
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
      //token: "",
    };
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
        <div className="container-fluid"> 
                  <Link to="/">
                     <a className="navbar-brand">
                       <img id="logo" src={appLogo} alt="company logo: Dynamic with face"/>
                     </a>
         </Link> 
      <Container fixed disableGutters id="NavBar">
        <Paper elevation={10}>
          <Paper>
            <Button
              aria-controls="menu"
              aria-haspopup="true"
              onClick={(e) => this.handleClick(e)}
            >
              Menu
            </Button>
            <Menu
              id="menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
               <MenuItem>
                <Link to="/">Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login">Login</Link>
                <LoginUser setToken = {this.props.setToken}/>
              </MenuItem>
              <MenuItem>
                <Link to="/register">Register</Link>
                <RegisterUser setToken = {this.props.setToken}/>
              </MenuItem>
              <MenuItem>
                <Link to="/announcement">Announcement</Link>
                
              </MenuItem>
              <MenuItem>
                <Link to="/schedule">Schedule</Link> 
                
              </MenuItem> 
              <MenuItem>
                <Link to="/waterloo">Admin Home</Link>
              </MenuItem> 
              
            </Menu>
          </Paper>
        </Paper>
      </Container>
      </div>
    );
  }
}
export default NavBar;