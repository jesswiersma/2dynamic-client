import React, { BaseSyntheticEvent, Component } from "react";
import { Route, Redirect } from "react-router";
import UserContext from "../UserContext/userContext";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from "../../helpers/environment";
import {
  Modal,
  Container,
  Fade,
  Paper,
  Backdrop,
  Grid,
  Card,
} from "@material-ui/core";

export interface LoginUserState {
  email: string;
  password: string;
  openModal: boolean;
  handleSubmit: boolean;
  //isAdmin: boolean
}

export interface LoginUserProps {
  setToken: (newToken: string) => void;
}

class LoginUser extends Component<LoginUserProps, LoginUserState> {
  static contextType = UserContext;
  constructor(props: LoginUserProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      openModal: false,
      handleSubmit: false,
      //isAdmin: false,
    };
  }

  handleOpenModal(e: React.BaseSyntheticEvent) {
    this.setState({
      openModal: true,
    });
  }

  handleClose = () => {
    this.setState({
      openModal: false,
      handleSubmit: false,
    });
  };

  loginUser(e: BaseSyntheticEvent) {
    console.log("handlesubmit");
    e.preventDefault();
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((res) => {
        console.log("hi");
        if (res.status !== 200) {
          console.log("Invalid username or password");
          alert("Invalid username or password");
        } else {
          console.log("test");
          alert("Successfully logged in!");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.context.setToken(data.sessionToken);
      });
  }

  handleChange(e: BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<
        LoginUserState,
        keyof LoginUserState
      >,
    }));
  }

  // Not Working
  logout = () => {
    window.localStorage.clear();
  };

  render() {
    return (
      <div className = "login">
                
      <form onSubmit={(e) => this.loginUser(e)}>
        <FormControl>
          <TextField
            required
            label="email"
            type="text"
            name="email"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={(e) => this.handleChange(e)}
          />
        </FormControl>
        <FormControl>
          <TextField
            required
            label="password"
            type="text"
            name="password"
            inputProps={{
                min: 5, 
                maxLength: 25}} 
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            //errorText= "Please enter a password between 5 and 25 characters"
            onChange={(e) => this.handleChange(e)}
          />
        </FormControl>
        <FormControl>
        <Button variant="outlined" color="primary" type="submit">
              Login 
            </Button> 
          
            {this.context.isAdmin ? <Redirect to="/waterloo" /> : <Redirect to = "/user"/>}
            
        </FormControl>
        </form>
        {/* <Button onClick={this.logout} variant="outlined" color="primary" type="submit">
              Logout
            </Button> */}
      </div>
     
    );
  }
}

export default LoginUser;


// <div className="loginModal">
// <Grid className="LoginDisplay" item xs={12} sm={4} md={3} lg={2}>
//   <Button
//     size="small"
//     variant="outlined"
//     onClick={(e) => this.handleOpenModal(e)}
//     color="primary"
//   >
//     Login
//   </Button>
//   <Modal open={this.state.openModal} onClose={this.handleClose}>
//     {/* <Container maxWidth="md"> */}
//     <Paper style={{ maxHeight: 500, maxWidth: 200, overflow: "auto" }}>
//       <form onSubmit={(e) => this.loginUser(e)}>
//         <FormControl>
//           <TextField
//             required
//             label="email"
//             type="text"
//             name="email"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             variant="outlined"
//             onChange={(e) => this.handleChange(e)}
//           />
//         </FormControl>
//         <br />
//         <FormControl>
//           <TextField
//             required
//             label="password"
//             type="text"
//             name="password"
//             inputProps={{
//               min: 5,
//               maxLength: 25,
//             }}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             variant="outlined"
//             onChange={(e) => this.handleChange(e)}
//           />
//         </FormControl>
//         <FormControl>
//           <Button variant="outlined" color="primary" type="submit">
//             Login
//           </Button>

//           {this.context.isAdmin ? (
//             <Redirect to="/waterloo" />
//           ) : (
//             <Redirect to="/user" />
//           )}
//         </FormControl>
//       </form>
//     </Paper>
//     {/* </Container> */}
//   </Modal>
//   <Modal
//     aria-labelledby="transition-modal-title"
//     aria-describedby="transition-modal-description"
//     open={this.state.openModal}
//     onClose={this.handleClose}
//     closeAfterTransition
//     BackdropComponent={Backdrop}
//     BackdropProps={{
//       timeout: 500,
//     }}
//   >
//     <Fade in={this.state.openModal}>
//       <Container>
//         <Paper></Paper>
//       </Container>
//     </Fade>
//   </Modal>
// </Grid>
// </div>
