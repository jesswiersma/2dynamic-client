import React, { Component } from "react";
import { FormGroup } from "reactstrap";
import UserContext from "../../UserContext/userContext";

import {
  Input,
  Container,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

interface Schedule {
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  description: string;
  id: number;
}

export interface ScheduleEditState {
  data: Schedule;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  description: string;
  token: string | null;
  openModal: boolean;
  openSchedule: boolean;
  isSet: boolean;
  id: number;
}

export interface ScheduleEditProps {
  id: number;
}

class ScheduleEdit extends Component<ScheduleEditProps, ScheduleEditState> {
  static contextType = UserContext;

  constructor(props: ScheduleEditProps) {
    super(props);
    this.state = {
      data: {
        day: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "",
        location: "",
        description: "",
        id: 0,
      },
      id: 0,
      day: "",
      date: "",
      startTime: "",
      endTime: "",
      type: "",
      location: "",
      description: "",
      token: null,
      openModal: false,
      openSchedule: false,
      isSet: false,
    };
  }

  handleOpenModal(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    this.setState({
      openModal: true,
    });
    this.getSchedule(this.props.id);
  }

  ////////// GET BY ID //////////

  getSchedule(id: number) {
    console.log("inside schedule get fetch");

    fetch(`${process.env.REACT_APP_SERVER}/schedule/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Schedule not displayed", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          day: data.schedule[0].day,
          date: data.schedule[0].date,
          startTime: data.schedule[0].startTime,
          endTime: data.schedule[0].endTime,
          type: data.schedule[0].type,
          location: data.schedule[0].location,
          description: data.schedule[0].description,
          id: data.schedule[0].id,
        });

        console.log("schedule", data);
        setTimeout(() => {
          this.stateSetter(data);
        }, 500);
      });
  }

  ////////////// EDIT ///////////////////

  editSchedule(e: React.BaseSyntheticEvent, id: number) {
    if (e) {
      e.preventDefault();
    }
    console.log(this.state);

    fetch(`${process.env.REACT_APP_SERVER}/waterloo/schedule/update/${id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-type": "Application/json",
        "Authorization": `Bearer ${this.context.token}`,
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
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Schedule edit failed", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("schedule", data);
        this.setState({
          data: data,
          openSchedule: true,
        });
      });
  }

  /////////////////////////////////////

  stateSetter = (data: Schedule) => {
    return this.setState({ isSet: true });
  };

  handleClose = () => {
    this.setState({
      openSchedule: false,
      openModal: false,
    });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    console.log(e.target.name, e.target.value);
    this.setState((data) => ({}));
  }

  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<
        ScheduleEditState,
        keyof ScheduleEditState
      >,
    }));
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(this.state);
    }, 1000);
  }

  render() {
    return (
      <div className="scheduleDisplay">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={(e) => {
            this.handleOpenModal(e);
          }}
        >
          Edit
        </Button>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Modal open={this.state.openModal} onClose={this.handleClose}>
            <Fade in={this.state.openModal}>
              <Container maxWidth="md">
                <Paper>
                  <form>
                    <Paper style={{ maxHeight: 500, overflow: "auto" }}>
                      <>
                        <Card>
                          <CardActionArea>
                            <CardContent>
                              <Typography>
                                {
                                  <div>
                                    <Paper>
                                      <form>
                                        <Card
                                          className="scheduleCreate"
                                          variant="outlined"
                                          color="black"
                                        >
                                          <CardActionArea>
                                            <CardContent>
                                              <FormGroup>
                                                <Input
                                                  placeholder={this.state.day}
                                                  name="day"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      day: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={this.state.date}
                                                  name="date"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      date: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={
                                                    this.state.startTime
                                                  }
                                                  name="startTime"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      startTime: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={
                                                    this.state.endTime
                                                  }
                                                  name="endTime"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      endTime: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={this.state.type}
                                                  name="type"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      type: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={
                                                    this.state.location
                                                  }
                                                  name="location"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      location: e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                              <FormGroup>
                                                <Input
                                                  placeholder={
                                                    this.state.description
                                                  }
                                                  name="description"
                                                  onChange={(e) =>
                                                    this.setState({
                                                      description:
                                                        e.target.value,
                                                    })
                                                  }
                                                />
                                              </FormGroup>
                                            </CardContent>
                                          </CardActionArea>
                                        </Card>
                                      </form>
                                      <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={(e) => {
                                          this.editSchedule(e, this.state.id);
                                        }}
                                      >
                                       
                                        Save Updates
                                      </Button>
                                    </Paper>
                                    <br />
                                  </div>
                                }
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </>
                    </Paper>
                  </form>
                </Paper>
              </Container>
            </Fade>
          </Modal>
        </Grid>
      </div>
    );
  }
}

export default ScheduleEdit;
