import {Box} from "@mui/material";
import React, {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import ToDo from "../components/ToDo";
import Button from "@mui/material/Button";
import ToDoModal from "../components/ToDoModal";
import ConfirmModal from "../components/ConfirmModal";
import {getListToDo} from "../apis/Apis";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress from "@mui/material/LinearProgress";
import MuiAlert from "@mui/material/Alert";
import {useForm} from "react-hook-form";

export default function HomePage() {
  const [list, setList] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentToDo, setCurrentToDo] = useState();
  const [isLoading, setIsLoading] = useState();
  const [snackbarMess, setSnackbarMess] = useState({});
  const {handleSubmit, control, reset} = useForm();

  const handleClose = () => {
    setOpen(false);
    setCurrentToDo();
    reset();
  };
  const handleOpen = (toDo) => {
    setCurrentToDo(toDo);
    setOpen(true);
  };
  const handleCloseSnackbar = () =>
    setSnackbarMess({...snackbarMess, open: false});
  const handleOpenSnackbar = (status, message) =>
    setSnackbarMess({
      open: true,
      message: message,
      status: status,
    });
  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleOpenConfirm = (toDo) => {
    setCurrentToDo(toDo);
    setOpenConfirm(true);
  };

  const mapList = () =>
    list?.map((e) => (
      <ToDo
        toDo={e}
        key={e._id}
        listToDo={list}
        setListToDo={setList}
        handleOpenConfirm={handleOpenConfirm}
        setIsLoading={setIsLoading}
        setCurrentToDo={setCurrentToDo}
        handleOpen={handleOpen}
      />
    ));
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      let listToDo = await getListToDo();
      setList(listToDo.data.data);
      setIsLoading(false);
    };

    init();
  }, []);

  return (
    <Box>
      {isLoading ? <LinearProgress /> : <Box></Box>}
      <Snackbar
        open={snackbarMess.open}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: "top", horizontal: "center"}}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMess.status}
          sx={{width: "100%"}}
        >
          {snackbarMess.message}
        </Alert>
      </Snackbar>
      <ToDoModal
        open={open}
        currentToDo={currentToDo}
        handleClose={handleClose}
        listToDo={list}
        handleOpenSnackbar={handleOpenSnackbar}
        setListToDo={setList}
        handleSubmit={handleSubmit}
        control={control}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        listToDo={list}
        setListToDo={setList}
        currentToDo={currentToDo}
        handleOpenSnackbar={handleOpenSnackbar}
      />
      <Box
        sx={{
          width: "80%",
          margin: "16px auto",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "20%",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginTop: "2%",
              textAlign: "left",
              marginLeft: "2.5%",
            }}
          >
            Today
          </Typography>
          <Typography
            color="black"
            variant="h1"
            style={{
              textAlign: "left",
              marginTop: "2px",
              marginLeft: "2.5%",
            }}
          >
            To do tasks
          </Typography>
        </Box>
        <Button
          style={{
            height: "56px",
            fontSize: "24px",
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
          onClick={() => {
            handleOpen();
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </Box>

      <Box
        sx={{
          margin: "2% auto",
          width: "80%",
        }}
      >
        {mapList()}
      </Box>
    </Box>
  );
}
