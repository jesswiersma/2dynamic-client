import React from "react";
import UserAnnouncementDisplay from "./UserAnnounce";
import UserScheduleDisplay from "./UserSchedule";

const UserHome: React.FunctionComponent = () => {
    return (
        <div className = "userHome">
        <h2>Welcome to your Home Page</h2>
        <p>Announcements</p>
        <div className="display">
        <UserAnnouncementDisplay/>
        <p>Schedule</p>
        <UserScheduleDisplay/> 
        </div>
        </div>
    )
}

export default UserHome;