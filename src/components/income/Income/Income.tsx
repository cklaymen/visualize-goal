import { Box } from "@mui/material";
import dayjs from "dayjs";

import { useStore } from "../../../store";

import getWorkedHours from "./helpers/getWorkedHours";

const Income: React.FC = () => {
    const incomeSettings = useStore(value => value.incomeSettings);
    if (!incomeSettings) {
        return <Box>Brak ustawień</Box>
    }
    const workedHours = getWorkedHours(dayjs(incomeSettings.firstDayDate, "YYYY-MM-DD"), incomeSettings.startTime, incomeSettings.endTime)

    return <Box>{workedHours}{JSON.stringify(incomeSettings)}</Box>;
}

export default Income;
