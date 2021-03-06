const express = require('express');

const router = express.Router();

//get the todos controller (router route controller, service inject into controller)

const ToDoController = require('../../controllers/todos.controller');

// map the api to the controller functions

router.get('/', ToDoController.getTodos);

router.post('/', ToDoController.createTodo);

router.put('/', ToDoController.updateTodo);

router.delete('/:id', ToDoController.removeTodo);

//Export the Router

module.exports = router;