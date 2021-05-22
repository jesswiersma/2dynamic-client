import React from "react";
import UserContext from "../../UserContext/userContext";
import {Button} from "@material-ui/core";

interface Announcement {
    title: string;
    date: string;
    description: string;
    response: boolean;
}

export interface DeleteAnnouncementState {
    data: Announcement [];
    token: string | null;
    openModal: boolean;
    openAnnouncement: boolean;
    isSet: boolean;
}

export interface DeleteAnnouncementProps {}

class DeleteAnnouncement extends React.Component<
DeleteAnnouncementProps,
DeleteAnnouncementState
> {
    static contextType = UserContext;
    constructor(props: DeleteAnnouncementProps) {
        super(props);
        this.state = {
            data: [],
            token: "",
            openModal: false,
            openAnnouncement: false,
            isSet: false,
        };
    }
    
    deleteAnnounce(e: React.BaseSyntheticEvent) {

        fetch("http://localhost:3000/anouncement/delete/:id", {
            method: "DELETE",
            headers: ({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.context.token}`,
            }),

            // body: JSON.stringify({
            //     title: this.state.title,
            //     date: this.state.date,
            //     description: this.state.description,
            //     response: this.state.response,
            // })
        })
        .then((res) => {
            console.log(res);

            if(res.status !== 200) {
                console.log("Announcement not deleted", res.status);
            } else {
                return res.json();
            }
        })
        .then((data) => {
            console.log("announcement", data);
            this.setState({
                data: data,
            });
        });
    }

    render() {
        return (
            <div className = "delete">
                <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick = {(e) => this.deleteAnnounce(e)}
                >
                    Delete
                </Button>
            </div>
        )
    }
}

export default DeleteAnnouncement;