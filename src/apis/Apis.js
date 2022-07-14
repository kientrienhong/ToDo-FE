import axios from "axios";

const domain = "http://localhost:3001";

export const getListToDo = async () => {
  const listToDo = await axios.get(`${domain}/api/v1/todos`, {});

  return listToDo;
};

export const createToDo = async (name) => {
  const listToDo = await axios.post(`${domain}/api/v1/todos`, {
    name: name,
    isDone: false,
  });

  return listToDo;
};

export const updateToDo = async (toDo) => {
  const newToDo = await axios.put(`${domain}/api/v1/todos/${toDo._id}`, {
    name: toDo.name,
    isDone: toDo.isDone,
  });

  return newToDo;
};

export const deleteToDo = async (id) => {
  const result = await axios.delete(`${domain}/api/v1/todos/${id}`);

  return result;
};
