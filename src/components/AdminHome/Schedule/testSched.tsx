import * as React from 'react';
import Paper from "@material-ui/core/Paper";
import {ViewState} from "@devexpress/dx-react-scheduler";
import {
    Scheduler,
    MonthView,
    Appointments,
    AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";

const currentDate = "2021-05-21";

export default  () => (
    <div className = "schedule">
        <p>Schedule for May 2021</p>
    <Paper>
        <Scheduler
        // data={appointments}
        >
            <ViewState
            currentDate={currentDate}
            />
            <MonthView/>
            <Appointments/>
            <AppointmentTooltip/>
        </Scheduler>
    </Paper>
    </div>
)
   