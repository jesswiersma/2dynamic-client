import React, { BaseSyntheticEvent } from "react";
import UserContext from "../../UserContext/userContext";
import AnnouncementEdit from "./EditAnnounce";

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

interface Announcement {
  title: string;
  date: string;
  description: string;
  response: boolean;
  id: number;
}

export interface AnnouncementGetState {
  data: Announcement[];
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
      data: [],
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

/////////// GET ALL ////////////////

  handleOpenAnnouncement(e: React.BaseSyntheticEvent) {
    
    fetch("http://localhost:3000/announcement/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.context.token}`,
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
          data: data,
          openAnnouncement: true,
        });
      });
  }

///////////// EDIT - get a 200 response but how do I put in a modal to actually edit??/////////////////////

  editAnnouncement = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (e) {e.preventDefault()};
    console.log("inside edit fetch")

    fetch(`http://localhost:3000/waterloo/announcement/update/${id}`, {
      method: "PUT",
      headers: new Headers ({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.context.token}`,
      }),

      body: JSON.stringify({
        data: this.state.data,
      })
    },
    )
    .then((res) => {
      if (res.status !== 200) {
        console.log(res)
        alert("Unable to edit announcement"); 
      } else {
        alert ("Announcement successfully edited!");
      }
      return res.json()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    })
  }

  ///////////// DELETE //////////////
  deleteAnnouncement = (e:React.MouseEvent<HTMLButtonElement>, id: number) => {
    if (e) {e.preventDefault()}
    console.log("inside delete fetch")

    fetch(`http://localhost:3000/waterloo/announcement/delete/${id}`, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.context.token}`,
        }),  
    })
    .then((res) => {
      if(res.status !== 200) {
        console.log(res)
        console.log("now you're here")
        alert ("Unable to delete announcement");
      } else {
        alert ("Announcement successfully deleted!");
      }
      return res.json()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    });
    };

  stateSetter = () => {
    return this.setState({ isSet: true });
  };

    // componentDidUpdate () {
    //     this.stateSetter()
    // }

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

  // componentDidMount=()=> {
  //   this.handleOpenAnnouncement(e)
  // }

  componentDidUpdate(){
    setTimeout(()=> {
      console.log(this.state.data)}, 1000,
    )
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
                      
                       Announcements
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
                      <Paper style ={{maxHeight: 500, overflow: "auto"}}>
                        <>
                        <Card>
                          <CardActionArea>
                            <CardContent>
                              <Typography>
                                {this.state.data.map((announcement, index) => {
                                  return (
                                    <>
                                    <Paper>
                                      <form>
                                    <Card className="announcementCreate"
                                    variant="outlined"
                                    color="black">
                                      <CardActionArea>
                                      <CardContent>
                                    <Typography component="h1"key={index}>{announcement.title}</Typography>
                                    <Typography component="h4" key={index}>{announcement.date}</Typography>
                                    <Typography className="announcementText" color="textSecondary" key={index}>{announcement.description}</Typography>
                                    </CardContent>
                                    </CardActionArea>
                                    </Card>
                                    </form>
                                    {/* <Button
                                    onClick = {(e) => {this.editAnnouncement(e, announcement.id)}}>Edit</Button> */}
                                   
                                    <AnnouncementEdit id={announcement.id}/> 
                                    <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick = {(e) => {this.deleteAnnouncement(e, announcement.id)}}
                                    >Delete</Button>
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

export default AnnouncementDisplay;
