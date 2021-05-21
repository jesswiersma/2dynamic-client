import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import CreateAnnounce from "./CreateAnnounce";

const DisplayAnnounce: React.FunctionComponent = () => {
    return(
        <div>
            <Card className="announcementCreate" variant="outlined" color = "black">
                  <CardContent>
                      <div className = "cardContent">
                    <Typography placeholder="title">
                        Confused
                     
                    </Typography>
                    <Typography variant="h5" component="h2" placeholder = "date">
                        As
                      {/* {this.state.date} */}
                    </Typography>
                    <Typography className="AnnouncementText" color="textSecondary" placeholder="description">
                        Always
                      {/* {this.state.description} */}
                    </Typography>
                    <Typography variant="body2" component="p" placeholder = "response">
                        Poop
                      {/* {this.state.response} */}
                      <br />
                      {'this should be a card displaying an announcemnt'}
                    </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
                
        </div>
    )
}

export default DisplayAnnounce;
