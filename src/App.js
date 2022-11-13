import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { List, Paper, Typography, IconButton } from "@mui/material";
import Card from "./components/Card.js";

import { AddCircle } from "@mui/icons-material";
import AddPostDialog from "./components/AddPostDialog";

const BASE_API_URL = `https://jsonplaceholder.typicode.com`;

function App() {
  const [posts, setPosts] = useState([]);
  const [newPosts, setNewPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function getPosts() {
      await axios
        .get(`${BASE_API_URL}/posts`)
        .then((res) => {
          const responseData = res.data;
          console.log(responseData);
          setPosts(responseData);
        })
        .catch((error) => {
          console.log(error);
          window.alert(error);
        })
    }

    getPosts();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <div className="list-container">
        <div className="list-title-wrapper">
          <Typography variant="h4">Posts</Typography>
          <IconButton onClick={openDialog}>
          <AddCircle />
          </IconButton>
        </div>
        
        <Paper elevation={2} style={{ maxHeight: "600px", overflow: "auto" }}>
          <List>
            {posts.map((d, idx) => (
              <Card
                key={d.id}
                title={`${d.title}`}
                body={`${d.body}`}
              />
            ))}
            {newPosts.map((d, idx) => (
              <Card
              key={d.id}
              title={d.title}
              body={d.body}
              />
            ))}
          </List>
        </Paper>
      </div>
      {isDialogOpen && (
        <AddPostDialog
          open={isDialogOpen}
          onClose={closeDialog}
          Posts={newPosts}
          setPosts={setNewPosts}
        />
      )}
    </div>
  );
}

export default App;
