import React from 'react';
import AnnouncementDisplay from "../AdminHome/Announce/GetAnnounce";

const HomeAnnounce: React.FunctionComponent = () => {
    return(
        <div className = "announceHome">
            <h2>Announcements</h2>
            <AnnouncementDisplay/> 

        </div>
    )
}

export default HomeAnnounce;