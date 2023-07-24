const express = require('express');
const { fetchUsers, updateUser, deleteUser, createUser, fetchUserById } = require('../Controller/UserController');

const router = express.Router();

router
    .get('/', fetchUsers)
    .get('/:id', fetchUserById)
    .post('/', createUser)
    .patch('/:id', updateUser)
    .delete('/:id', deleteUser)

exports.router = router;