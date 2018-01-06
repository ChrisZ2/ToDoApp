const express = require('express');

const router = express.Router();

//get the todos controller (router route controller, service inject into controller)

const ToDoController = require('../../controllers/todos.controller');

// map the api to the controller functions

router.get('/', ToDoController.getTodos);

