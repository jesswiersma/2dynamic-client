import React, { Component } from "react";
import {FormGroup} from 'reactstrap';
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

interface Announcement {
  title: string;
  date: string;
  description: string;
  response: boolean;
  id: number;
}

export interface AnnouncementEditState {
  data: Announcement;
  title: string;
  date: string;
  description: string;
  response: boolean;
  token: string | null;
  openModal: boolean;
  openAnnouncement: boolean;
  isSet: boolean;
  id: number;
}

export interface AnnouncementEditProps {
  id: number;
}

class AnnouncementEdit extends Component<
  AnnouncementEditProps,
  AnnouncementEditState
> {
  static contextType = UserContext;

  constructor(props: AnnouncementEditProps) {
    super(props);
    this.state = {
      data: {
        title: "",
        date: "",
        description: "",
        response: false,
        id: 0,
      },
      id: 0,
      title: "",
      date: "",
      description: "",
      response: false,
      token: null,
      openModal: false,
      openAnnouncement: false,
      isSet: false,
    };
  }

  handleOpenModal(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    this.setState({
      openModal: true,
    });
    this.getAnnouncement(this.props.id);
  }

  /////// GET BY ID ////////

  getAnnouncement(id: number) {
    //if (e) {e.preventDefault()}
    console.log("inside get by id fetch");

    fetch(`${process.env.REACT_APP_SERVER}/announcement/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
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
        console.log(data);
        this.setState({
          title: data.announcement.title,
          date: data.announcement.date,
          description: data.announcement.description,
          id: data.announcement.id,
        });

        console.log("announcement", data);
        setTimeout(() => {
          this.stateSetter(data);
        }, 500);
      });
  }

  ///////////////// EDIT ///////////////////

  editAnnouncement(e: React.BaseSyntheticEvent, id: number) {
    if (e) {
      e.preventDefault();
    }
    console.log(this.state);

    fetch(
      `${process.env.REACT_APP_SERVER}/waterloo/announcement/update/${id}`,
      {
        method: "PUT",
        headers: new Headers({
          "Content-type": "Application/json",
          Authorization: `Bearer ${this.context.token}`,
        }),

        body: JSON.stringify({
          title: this.state.title,
          date: this.state.date,
          description: this.state.description,
          response: this.state.response,
        }),
      }
    )
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          console.log("Announcement edit failed", res.status);
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

  ///////////////////////////////////

  stateSetter = (data: Announcement) => {
    return this.setState({ isSet: true });
  };

  handleClose = () => {
    this.setState({
      openAnnouncement: false,
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
        AnnouncementEditState,
        keyof AnnouncementEditState
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
      <div className="announcementDisplay">
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
                                          className="announcementCreate"
                                          variant="outlined"
                                          color="black"
                                        >
                                          <CardActionArea>
                                            <CardContent>
                                              <FormGroup>
                                              <Input
                                                placeholder={this.state.title}
                                                name="title"
                                                onChange={(e) =>
                                                  this.setState({
                                                    title: e.target.value,
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
                                                  this.state.description
                                                }
                                                name="description"
                                                onChange={(e) =>
                                                  this.setState({
                                                    description: e.target.value,
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
                                          this.editAnnouncement(
                                            e,
                                            this.state.id
                                          );
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

export default AnnouncementEdit;
