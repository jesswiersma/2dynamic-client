import React from 'react';
import AnnouncementCreate from "./Announce/CreateAnnounce";
import AnnouncementDisplay from './Announce/GetAnnounce';
import ScheduleCreate from "./Schedule/CreateSched";
import ScheduleDisplay from "./Schedule/GetSched";

const AdminHome: React.FunctionComponent = () => {
    return(
        <div className = "adminHome">
            <h2>Admin Home</h2>
            <p>Fill out the following form to create an Announcement</p>
              <AnnouncementCreate/>  {/*Working POST - ugly form */}
              <br/>
              <AnnouncementDisplay/> {/* I would like to be able to view, edit and delete from this card */}
            <p>Fill out the following from to create the Schedule</p>
             <ScheduleCreate/>
             <br/>
             <ScheduleDisplay/>
             
              
        </div>
    )
}

export default AdminHome;

{/* <DisplayAnnounce/> This is the card I hoped would display an announcement */}