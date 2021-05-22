import React, {
    BaseSyntheticEvent,
    Component,
} from "react";
import {Route, Redirect} from "react-router";
import UserContext from "../UserContext/userContext";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


export interface LoginUserState {
    email: string,
    password: string,
    //isAdmin: boolean
} 

export interface LoginUserProps {
   setToken: (newToken: string) => void
}

class LoginUser extends Component <LoginUserProps, LoginUserState> {
    static contextType = UserContext;
    constructor(props: LoginUserProps) {
        super(props);
        this.state = {
            email: "",
            password: "",
            //isAdmin: false,
        };
    }

    handleSubmit(e: BaseSyntheticEvent) {
        console.log("handlesubmit")
        e.preventDefault();
        fetch(`http://localhost:3000/user/login`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            },
        )
        .then((res) => {
            console.log("hi")
            if(res.status !== 200) {
                console.log("Invalid username or password");
                alert("Invalid username or password");
            } else {
                console.log("test")
                alert("Successfully logged in!");
            }

            return res.json()
        })
            .then(data => {
                console.log(data)
                this.context.setToken(data.sessionToken)
            });
        }
    
        
    //add Logout here?

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

    }
        
    
    render() {
        return (
            <div>
              <form onSubmit={(e) => this.handleSubmit(e)}>
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
                <Button onClick={this.logout} variant="outlined" color="primary" type="submit">
                      Logout
                    </Button>
              </div>
        );
    };
}

export default LoginUser;