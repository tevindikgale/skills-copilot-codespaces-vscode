// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

// Create express app
const app = express();
// Enable CORS
app.use(cors());
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  // Return comments for the post id
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  // Generate an id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the comment content from the request body
  const { content } = req.body;
  // Get the comments for the post id
  const comments = commentsByPostId[req.params.id] || [];
  // Add the comment to the comments object
  comments.push({ id: commentId, content });
  // Add the comments to the comments object
  commentsByPostId[req.params.id] = comments;
  // Return the comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});
