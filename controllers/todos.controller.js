const TodoService = require('../services/todo.service');

_this = this;


exports.getTodos = async function (req, res, next) {

    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit);

    try {
        let todos = await TodoService.getTodos({}, page, limit);
        consolt.log(todos);
        return res.status(200).json({status: 200, data: todos, message: "Successfully Todos Recieved"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.createTodo = async function (req, res, next) {
    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try {
        let createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Successfully Created ToDo"});
    } catch (e) {
        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccesfull"});
    }
};

exports.updateTodo = async function (req, res, next) {

    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"});
    }

    const id = req.body._id;

    console.log(req.body);

    let todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try {
        let updatedTodo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"});
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message});
    }
};

exports.removeTodo = async function (req, res, next) {

    const id = req.params.id;

    try {
        let deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({status: 204, message: "Succesfully Todo Deleted"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

};