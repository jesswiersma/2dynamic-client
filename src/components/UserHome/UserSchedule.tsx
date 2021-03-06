import React from "react";
import UserContext from "../UserContext/userContext";

import {
  Container,
  Grid,
  Paper,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  List,
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
  token: string | null;
  openModal: boolean;
  openSchedule: boolean;
  isSet: boolean;
  id: number;
}

export interface ScheduleGetState {
  data: Schedule[];
  token: string | null;
  openModal: boolean;
  openSchedule: boolean;
  isSet: boolean;
  
}

export interface ScheduleGetProps {}

class UserScheduleDisplay extends React.Component<
  ScheduleGetProps,
  ScheduleGetState
> {
  static contextType = UserContext;
  constructor(props: ScheduleGetProps) {
    super(props);
    this.state = {
       data: [],
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

///////////// GET ALL /////////////////

  handleOpenAnnouncement(e: React.BaseSyntheticEvent) {

    fetch(`${process.env.REACT_APP_SERVER}/schedule/`, {
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
          data: data,
          openSchedule: true,    
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
  
  componentDidUpdate(){
    setTimeout(()=>{
      console.log(this.state.data)}, 1000,
      )
  }


  render() {
    return (
      <div className = "scheduleDisplay">
          <Grid className="schedDisplay" item xs={12} sm={4} md={3} lg={2}>
            <Paper elevation={20} variant="outlined" >
              <Card>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                       Schedule
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
                      <Paper style ={{maxHeight: 500, overflow: "auto"}}>
                        <>
                        <Card className="schedWrapper"
                        variant="outlined"
                        color="black">
                          <CardActionArea>
                            <CardContent>
                              <Typography>
                                {this.state.data.map((schedule, index) => {
                                  return (
                                    <>
                                    <Paper>
                                      <form>
                                    <Card className="scheduleCreate"
                                    variant="outlined"
                                    color="black">
                                      <CardActionArea>
                                      <CardContent>
                                    <Typography component="h1"key={index}>Day: {schedule.day}</Typography>
                                    <Typography component="h4" key={index}>Date: {schedule.date}</Typography>
                                    <Typography component="h4" key={index}>Start Time: {schedule.startTime}</Typography>
                                    <Typography component="h4" key={index}>End Time: {schedule.endTime}</Typography>
                                    <Typography component="h4" key={index}>Type: {schedule.type}</Typography>
                                    <Typography component="h4" key={index}>Location: {schedule.location}</Typography>
                                    <Typography className="announcementText" color="textSecondary" key={index}>Description: {schedule.description}</Typography>
                                    </CardContent>
                                    </CardActionArea>
                                    </Card>
                                    </form>
                                    <br/>

                                    {/* <ScheduleEdit id={schedule.id}/>
                                    
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick = {(e) => {this.deleteSchedule(e, schedule.id)}}
                                    >Delete</Button> */}
                                    </Paper>
                                    <br/>
                                    </>
                                    
                                  )
                                })}
                                
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
      </div>
    );
  }
}

export default UserScheduleDisplay;