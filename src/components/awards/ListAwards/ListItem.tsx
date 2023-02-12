import { alpha, Box, LinearProgress, Typography } from "@mui/material";

import { Award } from "../../../store";
import { Money } from "../../../store/models/common";

interface ListItemProps {
    award: Award
    flexGrow: number;
    coveredCost: Money;
}

const ListItem: React.FC<ListItemProps> = ({ award, flexGrow, coveredCost }) => <Box
    sx={{
        backgroundImage: `url('${award.imageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flex: flexGrow,
        height: "unset",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
    }}
>
    <Box
        sx={(theme) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            backdropFilter: "blur(2px)",
            px: 2,
            py: 1,
        })}
    >
        <LinearProgress variant="determinate" value={coveredCost / award.cost * 100} />
        <Typography variant="caption">{coveredCost.toFixed(2)} / {award.cost.toFixed(2)} PLN ({(coveredCost / award.cost * 100).toFixed(2)}%)</Typography>
        <Typography variant="subtitle2">{award.title}</Typography>
    </Box>
</Box>

export default ListItem;
