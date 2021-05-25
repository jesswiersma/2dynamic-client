import { userInfo } from "os";
import React from "react";
import UserAnnouncementDisplay from "./UserAnnounce";
import UserScheduleDisplay from "./UserSchedule";
import CitySheet1 from "../assets/CitySheet1.png";

const UserHome: React.FunctionComponent = () => {
    return (
        <div className = "userHome">
        <h2>Welcome to your Home Page</h2>
        <p>Announcements</p>
        <div className="display">
        <UserAnnouncementDisplay/>
        <p>Schedule</p>
        <UserScheduleDisplay/> 
        <p>City Sheets, Housing Info, Etc</p>
        <img id="citySheet" src={CitySheet1} alt="citySheet1"/>
        </div>
        </div>
    )
}

export default UserHome;