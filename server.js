// server.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let postData = {
  posts: []
};

app.get('/posts', (req, res) => {
  res.json(postData);
});

app.post('/posts', (req, res) => {
  const { content } = req.body;
  const newPost = {
    content: content,
    comments: []
  };
  postData.posts.push(newPost);
  res.json(postData);
});

app.post('/comments/:postId', (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const newComment = {
    content: content
  };
  postData.posts[postId].comments.push(newComment);
  res.json(postData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
