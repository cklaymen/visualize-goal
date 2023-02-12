import {
    Alert,
    Button,
    InputAdornment, Snackbar, Stack,
    TextField
} from "@mui/material";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { incomeService, IncomeSettings as IncomeSettingsData, useStore } from "../../../store";

const IncomeSettings: React.FC = () => {
    const [feedback, showFeedback] = useState(false);
    const incomeSettings = useStore(store => store.incomeSettings)
    const { register, handleSubmit } = useForm<IncomeSettingsData>({ defaultValues: incomeSettings })

    const changeSettings = useCallback((incomeSettings: IncomeSettingsData) => {
        incomeService.changeSettings(incomeSettings)
        showFeedback(true);
    }, [])

    return <Stack component="form" onSubmit={handleSubmit(changeSettings)} gap={1}>
        <Stack direction="row" gap={1}>

            <TextField label="Stawka NETTO" type="number" InputProps={{
                endAdornment: <InputAdornment position="end">PLN/H</InputAdornment>
            }} inputProps={{ step: "0.01" }} {...register("hourlyRate", { valueAsNumber: true })} />
            <TextField label="Podatek" type="number" InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
            }} {...register("tax", { valueAsNumber: true })} />
        </Stack>
        <Button variant="contained" type="submit">Zapisz</Button>
        <Snackbar open={feedback} onClose={() => showFeedback(false)} autoHideDuration={2000}><Alert severity="success">Zapisano!</Alert></Snackbar>
    </Stack>
}

export default IncomeSettings;
