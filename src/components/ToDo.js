import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import {RadioButtonUnchecked, CheckCircleRounded} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {updateToDo} from "../apis/Apis";
export default function ToDo({
  toDo,
  handleOpenConfirm,
  listToDo,
  setListToDo,
  setIsLoading,
  setCurrentToDo,
  handleOpen,
}) {
  const onChangeCheckBox = async (val) => {
    setIsLoading(true);
    const toDoTemp = {...toDo, isDone: val.target.checked};
    await updateToDo(toDoTemp);
    let tempListToDo = [...listToDo];
    const indexFound = tempListToDo.findIndex((e) => e._id === toDoTemp._id);
    tempListToDo[indexFound] = toDoTemp;
    setListToDo(tempListToDo);
    setIsLoading(false);
  };

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
            onChange={(val) => {
              onChangeCheckBox(val);
            }}
            checked={toDo.isDone}
            icon={<RadioButtonUnchecked />}
            checkedIcon={<CheckCircleRounded />}
          />
        </Box>
        <Box
          sx={{
            width: "75%",
          }}
        >
          <Typography color="black" variant="h2">
            {toDo.name}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "20%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img
            onClick={() => {
              handleOpen();
              setCurrentToDo(toDo);
            }}
            src="edit.png"
            alt="edit"
            width={40}
            height={40}
            style={{
              cursor: "pointer",
              marginBottom: "8px",
              marginRight: "16px",
            }}
          />
          <img
            onClick={() => handleOpenConfirm(toDo)}
            src="delete.png"
            alt="delete"
            width={40}
            height={40}
            style={{
              cursor: "pointer",
              marginBottom: "8px",
            }}
          />
        </Box>
      </Box>
      <Divider />
    </Box>
  );
}
