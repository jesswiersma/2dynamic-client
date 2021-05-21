import React from "react";
import UserContext from "../../UserContext/userContext";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import {
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

const marks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export interface ScheduleGetState {
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
}

export interface ScheduleGetProps {}

class ScheduleDisplay extends React.Component<
  ScheduleGetProps,
  ScheduleGetState
> {
  static contextType = UserContext;
  constructor(props: ScheduleGetProps) {
    super(props);
    this.state = {
        day: "",
        date: "",
        startTime: "",
        endTime: "",
        type: "",
        location: "",
        description: "",
        token: "",
        openModal: false,
        openSchedule: false,
        isSet: false,
    };
  }
  handleOpenModal(e: React.BaseSyntheticEvent) {
    this.setState({
      openModal: true,
    });
  }

  handleOpenAnnouncement(e: React.BaseSyntheticEvent) {
    this.setState({
      openSchedule: true,
    });
    console.log(this.state.day, this.state.date, this.state.description);

    fetch("http://localhost:3000/schedule/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        console.log("Schedule", data);
        this.setState({
          day: this.state.day,
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          type: this.state.type,
          location: this.state.location,
          description: this.state.description,    
        });
      });
  }

  stateSetter = () => {
    return this.setState({ isSet: true });
  };

  //   componentDidUpdate () {
  //       this.stateSetter()
  //   }

  handleClose = () => {
    this.setState({
      openSchedule: false,
      openModal: false,
    });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<
        ScheduleGetState,
        keyof ScheduleGetState
      >,
    }));
  }

  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<
        ScheduleGetState,
        keyof ScheduleGetState
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
    });
  }

  render() {
    return (
      <div className = "scheduleDisplay">
        {/* {this.state.isSet ? ( */}
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Paper elevation={20} variant="outlined">
              <Card >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      {this.state.day}
                      {this.state.date}
                      {this.state.startTime}
                      {this.state.endTime}
                      {this.state.type}
                      {this.state.location}
                      {this.state.description}
                       I'd love for the schedule to populate here!
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => this.handleOpenAnnouncement(e)}
                    color="primary"
                  >
                    View Schedule
                  </Button>
                </CardActions>

                <CardActions>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => this.handleOpenModal(e)}
                    color="primary"
                  >
                    Edit 
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => this.handleOpenAnnouncement(e)}
                    color="primary"
                  >
                    Delete
                  </Button>

                </CardActions>
              </Card>
            </Paper>
            <Modal
              open={this.state.openSchedule}
              onClose={this.handleClose}
            >
              <Fade in={this.state.openSchedule}>
                <Container maxWidth="md">
                  <Paper>
                    <form>
                      <Paper>
                        <TextareaAutosize
                          value={this.state.description}
                          placeholder="is anyone there?"
                          name="comment"
                          style = {{width: "300x" , height: "150px"}}
                          onChange={(e) => this.handleChange(e)}
                        />
                      </Paper>
                      <Paper></Paper>
                      <Paper>
                        <Button
                        
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Submit Schedule
                        </Button>
                      </Paper>
                    </form>
                  </Paper>
                </Container>
              </Fade>
            </Modal>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={this.state.openModal}
              onClose={this.handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={this.state.openModal}>
                <Container>
                  <Paper></Paper>
                </Container>
              </Fade>
            </Modal>
          </Grid>
        {/* ) : ( */}
          <p>This is a working fetch for schedule but can't get display</p>
        {/* ) */}
      </div>
    );
  }
}

export default ScheduleDisplay;