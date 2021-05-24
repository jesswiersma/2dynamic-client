import React, {Component} from 'react';
//import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {CircularProgress} from "@material-ui/core";

import UserContext from "../../UserContext/userContext";

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
export interface AnnouncementEditState {
    data: Announcement[];
    title: string;
    date: string;
    description: string;
    response: boolean;
    token: string | null;
    openModal: boolean;
    openAnnouncement: boolean;
    isSet: boolean;
}

export interface AnnouncementEditProps {
  id: number,
}

class AnnouncementEdit extends Component <AnnouncementEditProps, AnnouncementEditState> {
    static contextType = UserContext;

    constructor(props: AnnouncementEditProps) {
        super(props);
        this.state = {
            data: [],
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
        this.setState({
            openModal: true,
            
        });
        this.getAnnouncement(this.props.id);
    }

    /////// GET BY ID ////////

    getAnnouncement(id: number) {
     //if (e) {e.preventDefault()}
     console.log("inside get by id fetch")

     fetch(`http://localhost:3000/announcement/${id}`, {
       method: "GET",
       headers: {
         "Content-Type": "Application/json",
         "Authorization": `Bearer ${this.context.token}`,
       },
     })
     .then((res)=> {
       console.log(res);

       if (res.status !== 200){
         console.log("Announcement not displayed", res.status);
       } else {
         return res.json();
       }
     })
     .then((data)=> {
      this.setState({
        data: data,
      })
       console.log("announcement", data);
       this.stateSetter(data);
     })
    }


    editAnnouncement(e: React.BaseSyntheticEvent, id: number ) {
        if (e) {e.preventDefault()}
        console.log("inside edit fetch")

        fetch(`http://localhost:3000/waterloo/announcement/update/${id}`, {
            method: "PUT",
            headers: new Headers ({
                "Content-type": "Application/json",
                "Authorization": `Bearer ${this.context.token}`,
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

    stateSetter = (data: Announcement[]) => {
        return this.setState({ isSet: true});
    };

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
            AnnouncementEditState,
            keyof AnnouncementEditState
            >,
        }));
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


    // componentDidMount() {
    //   console.log(this.props.id);
    //  //this.getAnnouncement(this.props.id);
    // }


    componentDidUpdate(){
      setTimeout(()=> {
        console.log(this.state.data)}, 1000,
      )
    }

    render() {
        return (
            <div className = "announcementDisplay">
             <Button 
             type="submit"
             variant="contained"
             color="primary"
             onClick={(e)=> {this.handleOpenModal(e)}}>
               Edit
             </Button>
                <Grid item xs={12} sm={4} md={3} lg={2}>
                  
                  <Modal
                    open={this.state.openModal}
                    onClose={this.handleClose}
                  >
                    <Fade in={this.state.openModal}>
                      <Container maxWidth="md">
                        <Paper>
                          <form>
                            <Paper style ={{maxHeight: 500, overflow: "auto"}}>
                              <>
                              <Card>
                                <CardActionArea>
                                  <CardContent>
                                    <Typography>
                                    {this.state.isSet ? 
                                      
                                      this.state.data.map((announcement, index) => {  
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
                                          <Button
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          onClick={(e)=> {this.editAnnouncement(e, announcement.id)}}
                                          >Save Updates</Button>
                                          {/* <Button
                                          type="submit"
                                          variant="contained"
                                          color="primary"
                                          onClick = {(e) => {this.deleteAnnouncement(e, announcement.id)}}
                                          >Delete</Button>  */}
                                          </Paper> 
                                          <br/> 
                                           </>
                                       
                                        )
                                        }) 
                                     : this.state.data === [] ? <p>No Data Available</p> : <CircularProgress style={{marginTop: '50%'}}/>
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

export default AnnouncementEdit;