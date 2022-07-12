import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import {RadioButtonUnchecked, CheckCircleRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
export default function ToDo({toDo}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "5%",
          }}
        >
          <Checkbox
            size="medium"
            sx={{
              transform: "scale(1.5)",
            }}
            checked={toDo.isChecked}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircleRounded />}
          />
        </Box>
        <Box
          sx={{
            width: "85%",
          }}
        >
          <Typography color="black" variant="h2">
            {toDo.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "10%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img
            src="delete.png"
            alt="delete"
            style={{
              marginBottom: "8px",
            }}
          />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
