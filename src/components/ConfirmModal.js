import React, {useState} from "react";
import {deleteToDo} from "../apis/Apis";
import {Modal, Box, Button, Typography} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
export default function ConfirmModal({
  open,
  handleClose,
  setListToDo,
  listToDo,
  currentId,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const onDeleteToDo = async () => {
    try {
      setIsLoading(true);
      await deleteToDo(currentId);
      let indexFound = listToDo.findIndex((e) => e._id === currentId);
      let listTemp = [...listToDo];
      listTemp.splice(indexFound, 1);
      setListToDo(listTemp);
      handleClose();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          width: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        <Typography
          color="black"
          variant="h3"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
          }}
        >
          Do you want to delete this task?
        </Typography>
        <Box
          sx={{
            width: "60%",
            margin: "40px auto 10px auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {isLoading ? (
            <LoadingButton
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "16%",
              }}
              loading
              variant="contained"
            >
              Submit
            </LoadingButton>
          ) : (
            <LoadingButton
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "16%",
              }}
              onClick={onDeleteToDo}
              variant="contained"
            >
              Submit
            </LoadingButton>
          )}

          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={() => handleClose()}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
