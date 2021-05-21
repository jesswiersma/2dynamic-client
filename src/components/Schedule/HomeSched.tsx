import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { MonthView } from '@devexpress/dx-react-scheduler';
import Demo from "../AdminHome/Schedule/testSched";


// import appointments from '../../../demo-data/today-appointments';

const HomeSched: React.FunctionComponent = () => {
   return (
      //  <Demo/>
      <Paper>
        <Scheduler  height={660}>
           <WeekView startDayHour={8} endDayHour={20} /> 
          <Appointments />
        </Scheduler>
      </Paper>
 
    );
   };


// const HomeSched: React.FunctionComponent = () => {
//     return(
//         <div>

//         </div>
//     )
// }
// data={appointments}

export default HomeSched;