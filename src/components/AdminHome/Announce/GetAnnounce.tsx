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

export interface AnnouncementGetState {
  title: string;
  date: string;
  description: string;
  response: boolean;
  token: string | null;
  openModal: boolean;
  openAnnouncement: boolean;
  isSet: boolean;
}

export interface AnnouncementGetProps {}

class AnnouncementDisplay extends React.Component<
  AnnouncementGetProps,
  AnnouncementGetState
> {
  static contextType = UserContext;
  constructor(props: AnnouncementGetProps) {
    super(props);
    this.state = {
      title: "",
      date: "",
      description: "",
      response: false,
      token: "",
      openModal: false,
      openAnnouncement: false,
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
      openAnnouncement: true,
    });
    console.log(this.state.title, this.state.date, this.state.description);

    fetch("http://localhost:3000/announcement/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Announcement not displayed", res.status);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log("announcement", data);
        this.setState({
          title: this.state.title,
          date: this.state.date,
          description: this.state.description,
          response: this.state.response,
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
      openAnnouncement: false,
      openModal: false,
    });
  };

  handleChange(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value as Pick<
        AnnouncementGetState,
        keyof AnnouncementGetState
      >,
    }));
  }

  handleSwitch(e: React.BaseSyntheticEvent) {
    this.setState((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.checked as Pick<
        AnnouncementGetState,
        keyof AnnouncementGetState
      >,
    }));
  }

  componentDidMount() {
    this.setState({
      title: "",
      date: "",
      description: "",
      response: false,
    });
  }

  render() {
    return (
      <div className = "announcementDisplay">
        {/* {this.state.isSet ? ( */}
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Paper elevation={20} variant="outlined">
              <Card >
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      {this.state.title}
                      {this.state.date}
                      {this.state.description}
                       I'd love for the announcement to populate here!
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
                    View Announcement
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
              open={this.state.openAnnouncement}
              onClose={this.handleClose}
            >
              <Fade in={this.state.openAnnouncement}>
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
                          Submit Announcement
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
          <p>This is supposed to be the fetch for get all announcements</p>
        {/* ) */}
      </div>
    );
  }
}

export default AnnouncementDisplay;
