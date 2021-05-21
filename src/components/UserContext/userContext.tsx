import React, {Component} from "react";

type ContextProps = {};
const UserContext = React.createContext<Partial<ContextProps>>({});

export default UserContext;

export interface UserContextProviderProps {}

export interface UserContextProviderState {
    token: string | null;
    user: any;
    isAuth: boolean;
}

export class UserContextProvider extends Component<
  UserContextProviderProps,
  UserContextProviderState
> {
    constructor(props: UserContextProviderProps) {
        super(props);
        this.state = {
            token: null,
            user: {},
            isAuth: false,
        };
    }

    componentDidMount() {
        this.setState({
            token: localStorage.getItem("token"),
        });
    }

    componentDidUpdate (
        prevProps: UserContextProviderProps,
        prevState: UserContextProviderState
    ) {
        console.log(prevState.token, '|', this.state.token);
        if (this.state.token !== prevState.token) {
            console.log("41", this.state.token)
            if (this.state.token) {
                localStorage.setItem("token", this.state.token);
                
                fetch(`http://localhost:3000/user/`, {
                    headers: new Headers ({
                        Authorization: `Bearer ${this.state.token}`}),
                    })
                    .then((res) => {
                        if (res.status !== 200) {
                            this.setState({
                                token: null,
                                user: {},
                                isAuth: false,
                            });
                            localStorage.removeItem("token");
                        }
                        return res.json();
                    })
                    .then((data)=> {
                        if (data.user) {
                            console.log("SUCCESS LOGIN")
                            this.setState({
                                user: data.user,
                                isAuth: true,
                            });
                        }
                    });
                } else {
                    console.log("you did not pass - failed");
                    this.setState({
                        user: {},
                        isAuth: false,
                    });
                    localStorage.removeItem("token");
                }
            }
        }

        setToken = (token: string | null) => {
            console.log(token)
            this.setState({
                token: token,
            });
        };

        render(){
            return(
                <UserContext.Provider
                value = {{
                    token: this.state.token,
                    setToken: this.setToken,
                    isAuth: this.state.isAuth,
                }} >
                    {this.props.children}
                    </UserContext.Provider>
            );
        }
    }