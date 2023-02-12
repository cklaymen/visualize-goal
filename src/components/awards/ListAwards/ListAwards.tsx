import { alpha, Box, Typography } from "@mui/material";

import { useStore } from "../../../store";

const ListAwards: React.FC = () => {
  const awards = useStore((value) => value.awards);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      {awards.map((award, i) => (
        <Box
          key={award.id}
          sx={{
            backgroundImage: `url('${award.imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flex: awards.length - i,
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
            <Typography variant="caption">{award.cost} PLN</Typography>
            <Typography variant="subtitle2">{award.title}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ListAwards;
