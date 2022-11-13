import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
  } from "@mui/material";
  import axios from "axios";
  import React, { useState } from "react";
  
  const BASE_API_URL = `https://jsonplaceholder.typicode.com`;
  
  function AddPostDialog({ open, onClose, posts, setPosts }) {
    const [title, setName] = useState("");
    const [body, setJob] = useState("");
  
    const handleSubmit = () => {
      axios
        .post(`${BASE_API_URL}/posts`, {
          title: title,
          body: body
        })
        .then((res) => {
          setPosts([...posts, res.data]);
          console.log(res.data);
        })
        .catch((error) => console.log(error));
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add dummy</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: ".5rem",
            padding: "8px 20px"
          }}
        >
          <TextField
            name="title"
            label="title"
            value={title}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            name="body"
            label="body"
            value={body}
            onChange={(event) => setJob(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default AddPostDialog;
  