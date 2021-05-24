import React from "react";
import AnnouncementDisplay from '../AdminHome/Announce/GetAnnounce';
import ScheduleDisplay from "../AdminHome/Schedule/GetSched";


const UserHome: React.FunctionComponent = () => {
    return (
        <div className = "userHome">
        <h2>Welcome to your Home Page</h2>
        <p>Announcements</p>
        <div className="display">
        <AnnouncementDisplay/>
        <p>Schedule</p>
        <ScheduleDisplay/>
        </div>
        </div>
    )
}

export default UserHome;