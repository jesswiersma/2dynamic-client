import React, { Component, BaseSyntheticEvent} from "react";
//import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router-dom";
//import APIURL from "../../helpers/environment";

export interface RegisterUserState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    organization: string;
    isAdmin: boolean;
}

export interface RegisterUserProps {
  setToken: (newToken: string) => void
}

class RegisterUser extends Component <RegisterUserProps, RegisterUserState> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            organization: "",
            isAdmin: false,
        };
    }

    handleSubmit(e: BaseSyntheticEvent) {

        e.preventDefault();
        console.log(this.state)
        console.log("line before fetch")
        fetch(`${process.env.REACT_APP_SERVER}/user/register`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                organization: this.state.organization,
                isAdmin: this.state.isAdmin,
            }),  
            },
        )
        .then((res) => {
            if (res.status !== 201) {
              console.log(res)
                alert("Unable to register");
            } else {
                //redirect to login?
                alert("Successfully registered");
            }
            return res.json()
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
        )}

        handleChange(e: BaseSyntheticEvent) {
            this.setState((prevstate) => ({
                ...prevstate,
                [e.target.name]: e.target.value as Pick<
                RegisterUserState,
                keyof RegisterUserState
                >,
            }));
        }

        componentDidMount(){
            this.setState({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                organization: "",
                isAdmin: false,
            })
        }

        render() {
            return (
              <div>
                <>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                  <FormControl>
                    <TextField
                      required
                      label="First Name"
                      type="text"
                      name="firstName"
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
                      label="Last Name"
                      type="text"
                      name="lastName"
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
                      label="Email"
                      type="email"
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
                      label="Password"
                      type="password"
                      name="password"
                      inputProps={{minLength: 5, maxLength: 25}} 
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
                      label="Organization"
                      type="text"
                      name="organization"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </FormControl>
                  <FormControl>
                    <Button variant="outlined" color="primary" type="submit">
                      Register
                    </Button>
                  </FormControl>
                </form>
                </>
                {this.context.isAuth ? <Redirect to="/" /> : null}
              </div>
            );
          }
        }

export default RegisterUser;