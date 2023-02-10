import { Box } from "@mui/material";
import dayjs from "dayjs";

import duration from "dayjs/plugin/duration";

import useWorkedHours from "./useWorkedTime";

dayjs.extend(duration);

const WorkedTime: React.FC = () => {
    const workedTime = useWorkedHours()

    if (!workedTime) {
        return null;
    }

    const workDuration = dayjs.duration(workedTime)

    return <Box>{Math.floor(workDuration.asHours())} godzin, {workDuration.minutes()} minut, {workDuration.seconds()} sekund</Box>
}

export default WorkedTime;
