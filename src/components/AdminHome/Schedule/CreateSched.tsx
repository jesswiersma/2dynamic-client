import React, {BaseSyntheticEvent, Component} from 'react';
import {Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import UserContext from "../../UserContext/userContext";
import { CardContent, Card, Paper } from '@material-ui/core';


export interface ScheduleCreateState {
    day: string;
    date: string;
    startTime: string;
    endTime: string;
    type: string;
    location: string;
    description: string
    token: string | null,
}

export interface ScheduleCreateProps {}

class ScheduleCreate extends Component <ScheduleCreateProps, ScheduleCreateState> {
    static contextType = UserContext;
    //const className = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;
    constructor(props: ScheduleCreateProps) {
        super(props);
        this.state = {
            day: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "",
            location: "",
            description: "",
            token: null,
        };
    }

    handleSubmit(e: BaseSyntheticEvent) {
        e.preventDefault();
        console.log("Fetch in schcedule Create")
        fetch(`${process.env.REACT_APP_SERVER}/waterloo/schedule`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.context.token}`
            }),
            
            body: JSON.stringify({
                day: this.state.day,
                date: this.state.date,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                type: this.state.type,
                location: this.state.location,
                description: this.state.description,
            }),
        },
        )
        
        .then((res) => {
            if (res.status !== 200) {
                console.log(res)
                alert ("Unable to create schedule");
            } else {
                alert ("Schedule successfully created!");
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
            ScheduleCreateState,
            keyof ScheduleCreateState
            >,
        }));
    }

    componentDidMount() {
        this.setState({
            day: "",
            date: "",
            startTime: "",
            endTime: "",
            type: "",
            location: "",
            description: "",
            token: null,                
        })
    }

    render() {
         return(
        <div className="scheduleFormOuter">
           <div className="scheduleFormInner">
            <Paper style={{maxWidth: 525}}>
            <div className="innerCard">Working Schedule Form to Create</div>
            <Card className="card" style={{maxWidth: 500, background: "#F1F1F1"}}>
                <CardContent>
                    
            <Form onSubmit = {(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor = "day"></Label>
                    <Input
                    required
                    type = "text"
                    placeholder = "Day"
                    name = "day"
                    value = {this.state.day}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "date"></Label>
                    <Input
                    required
                    type = "text"
                    placeholder = "ex: May 18, 2021"
                    name = "date"
                    value = {this.state.date}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "startTime"></Label>
                    <Input
                    required
                    type = "text"
                    placeholder = "Start Time"
                    name = "startTime"
                    value = {this.state.startTime}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "endTime"></Label>
                    <Input
                    // required
                    type = "text"
                    placeholder = "End Time"
                    name = "endTime"
                    value = {this.state.endTime}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "type"></Label>
                    <Input
                    required
                    type = "text"
                    placeholder = "type: ex: reh or con etc"
                    name = "type"
                    value = {this.state.type}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "location"></Label>
                    <Input
                    required
                    type = "text"
                    placeholder = "location"
                    name = "location"
                    value = {this.state.location}
                    onChange = {(e) => this.handleChange(e)}
                    />
                </FormGroup>
                <br></br>
                <FormGroup>
                    <Label htmlFor = "description"></Label>
                    
                    <Input
                    required
                    display="inline"
                    style = {{width: "400px" , height: "150px"}}
                    type = "text"
                    placeholder = "Schedule description"
                    name = "description"
                    value = {this.state.description}
                    onChange = {(e) => this.handleChange(e)}
                 
                     /> 
                </FormGroup>
                <br></br>
                <Button className = "SchedCreate" type = "submit">Submit Schedule</Button>
            </Form>
            
            </CardContent>
            </Card>
            </Paper>
            </div>
        </div>
    )
  }
}
       


export default ScheduleCreate;