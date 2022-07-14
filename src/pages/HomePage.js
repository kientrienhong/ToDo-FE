import {Box} from "@mui/material";
import React, {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import ToDo from "../components/ToDo";
import Button from "@mui/material/Button";
import ToDoModal from "../components/ToDoModal";
import ConfirmModal from "../components/ConfirmModal";
import {getListToDo} from "../apis/Apis";
export default function HomePage() {
  const [list, setList] = useState([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState();
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleOpenConfirm = (id) => {
    setOpenConfirm(true);
    setCurrentId(id);
  };

  const mapList = () =>
    list?.map((e) => (
      <ToDo toDo={e} key={e._id} handleOpenConfirm={handleOpenConfirm} />
    ));

  useEffect(() => {
    const init = async () => {
      let listToDo = await getListToDo();
      setList(listToDo.data.data);
    };

    init();
  }, []);

  return (
    <Box>
      <ToDoModal
        open={open}
        handleClose={handleClose}
        listToDo={list}
        setListToDo={setList}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        listToDo={list}
        setListToDo={setList}
        currentId={currentId}
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
