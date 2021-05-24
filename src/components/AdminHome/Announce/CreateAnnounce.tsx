import React, {BaseSyntheticEvent, Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import UserContext from "../../UserContext/userContext";
import APIURL from "../../../helpers/environment";

export interface AnnouncementCreateState {
    title: string;
    date: string;
    description: string;
    response: boolean;
    token: string | null,
}

export interface AnnouncementCreateProps {}

class AnnouncementCreate extends Component <AnnouncementCreateProps, AnnouncementCreateState> {
    static contextType = UserContext;

    constructor(props: AnnouncementCreateProps) {
        super(props);
        this.state = {
            title: "",
            date: "",
            description: "",
            response: false,
            token: null,
        };
    }

    handleSubmit(e: BaseSyntheticEvent) {
        e.preventDefault();
        console.log("Fetch in announcement Create")
        fetch(`${process.env.REACT_APP_SERVER}/waterloo/announcement`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.context.token}`
            }),
            
            body: JSON.stringify({
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                response: this.state.response,
            }),
        },
        )
        
        .then((res) => {
            if (res.status !== 200) {
                console.log(res)
                alert ("Unable to create announcement");
            } else {
                alert ("Announcement successfully created!");
            }
            return res.json()
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        })
    }

    handleChange(e: BaseSyntheticEvent) {
        this.setState((prevstate) => ({
            ...prevstate,
            [e.target.name]: e.target.value as Pick<
            AnnouncementCreateState,
            keyof AnnouncementCreateState
            >,
        }));
    }

    componentDidMount() {
        this.setState({
            title: "",
            date: "",
            description: "",
            response: false,        
        })
    }


    render() {
         return(
        <div>
            <div className = "announcement">Working Announcement Form to Create</div>
            <Form onSubmit = {(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor = "title"></Label>
                    <Input
                    type = "text"
                    placeholder = "Announcement Title"
                    name = "title"
                    value = {this.state.title}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "date"></Label>
                    <Input
                    type = "text"
                    placeholder = "Announcement Date"
                    name = "date"
                    value = {this.state.date}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "description"></Label>
                    <Input
                    style = {{width: "300x" , height: "150px"}}
                    type = "text"
                    placeholder = "Announcement Description"
                    name = "description"
                    value = {this.state.description}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <Button className = "CreateAnnounce" type = "submit">Submit Announcement</Button>
            </Form>
        </div>
    )
  }
}
       


export default AnnouncementCreate;