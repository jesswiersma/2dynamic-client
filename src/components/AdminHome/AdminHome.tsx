import React from 'react';
import AnnouncementCreate from "./Announce/CreateAnnounce";
import DisplayAnnounce from './Announce/DisplayAnnounce';
import AnnouncementDisplay from './Announce/GetAnnounce';
import ScheduleCreate from "./Schedule/CreateSched";
import ScheduleDisplay from "./Schedule/GetSched";

const AdminHome: React.FunctionComponent = () => {
    return(
        <div className = "adminHome">
            <h2>Admin Home</h2>
            <p>Is this working</p>
              <AnnouncementCreate/>  {/*Working POST - ugly form */}
              <AnnouncementDisplay/> {/* I would like to be able to view, edit and delete from this card */}
             <ScheduleCreate/>
             <ScheduleDisplay/>
              
        </div>
    )
}

export default AdminHome;

{/* <DisplayAnnounce/> This is the card I hoped would display an announcement */}