const express = require('express');
const router = express.Router();
const comments = require('../data/comments');

let commentId = 1;

router.get('/', (req, res) => {
    let data = comments;
    let userId = req.query.userId;
    let postId = req.query.postId
    if(userId && postId){
        data = comments.filter((comment) => comment.urId == userId && comment.postId == postId)

    }else if(userId && !postId){
        data = comments.filter((comment) => comment.userId == userId)
    } else {
        data = comments.filter((comment) => comment.postId == postId)
    }

    res.json(comments);
});

router.post('/', (req, res) => {
    const { userId, postId, body } = req.body;
    const newComment = { id: commentId++, userId, postId, body };
    comments.push(newComment);
    res.status(201).json(newComment);
});

router.get('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

router.post('/', (req, res) => {
    if(req.body.userId && req.body.postId && req.body.body){
        const comment = {
            id: comments.length + 1,
            userId: req.bodu.userId, 
            postId: req.body.postId,
            body: req.body.body,
        };
        comments.push(comment);
        res.json(comment);
    }else{
    res.status(404).send( 'Insufficient data ');
    }
})

router.patch('/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (comment) {
        comment.body = req.body.body || comment.body;
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

//delete comment
router.delete('/:id', (req, res) => {
    const commentIndex = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Comment not found');
    }
});

router.get('/', (req, res) => {
    const userId = req.query.userId;
    const postId = req.query.postId;
    if (userId) {
        const userComments = comments.filter(comment => comment.userId === parseInt(userId));
        res.json(userComments);
    } else if (postId) {
        const postComments = comments.filter(comment => comment.postId === parseInt(postId));
        res.json(postComments);
    } else {
        res.json(comments);
    }
});

module.exports = router;