import React, {useState} from "react";
import {Modal, Box, Typography, Button} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import {createToDo} from "../apis/Apis";
export default function ToDoModal({open, handleClose, setListToDo, listToDo}) {
  const {handleSubmit, control} = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const newToDo = await createToDo(data.name);
      setListToDo([...listToDo, newToDo.data.data]);
      handleClose();
    } catch (error) {
      console.log(error);
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
          width: "40%",
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginTop: "2%",
              textAlign: "left",
              marginLeft: "2.5%",
              marginBottom: "1%",
            }}
          >
            Add new to do
          </Typography>
          <Controller
            name={"name"}
            control={control}
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <TextField
                  label={"Name"}
                  variant="outlined"
                  value={value}
                  onChange={onChange}
                  style={{
                    margin: "16px auto",
                    width: "80%",
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
            rules={{required: "*Required"}}
          />
          <Box
            sx={{
              width: "40%",
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
                variant="contained"
                type="submit"
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
        </form>
      </Box>
    </Modal>
  );
}
