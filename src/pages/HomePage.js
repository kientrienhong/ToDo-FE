import {Box} from "@mui/material";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import ToDo from "../components/ToDo";
import Button from "@mui/material/Button";
export default function HomePage() {
  const [list, setList] = useState([
    {isChecked: true, name: "coding"},
    {isChecked: false, name: "coding"},
  ]);

  const mapList = () => list.map((e) => <ToDo toDo={e} />);

  return (
    <Box>
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
          onClick={async () => {}}
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
