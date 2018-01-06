//controller accessing the service
const TodoService = require("../services/todo.service");

//service to the curd, but controller handle the req and the exceptions

//Saving the context of this module inside the _this variable
_this = this;

//Async controller get the to do list

exports.getTodos = async function (req, res, next) {

    //check the existence of the query, if not assign a default
    let todos;
    let page = req.query.page ? req.query.page : 1;
    let limit = req.query.limit ? req.query.limit : 10;

    try {

        todos = await TodoService.getTodos({}, page, limit);

        return res.status(200).json({status: 200, data: todos, message: "Successfully get the todo list"});

    } catch (e) {
        //Return an Error Reponse Message with code and the Error message
        return res.status(400).json({status: 400, message: e.message});
    }

};

exports.createToDo = async function (req, res, next) {
    //Req.Body contains the form sumit values

    let todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try {
        let createToDo = await TodoService.createTodo(todo);
        return res.status(200).json({status: 201, data: createdToDo, message: "Creation successful"});

    } catch (e) {
        return res.status(400).json({status: 400, message: "Todo creation failed"});
    }
};

exports.updateTodo = async function (req, res, next) {

    //check id
    if (!req.body._id) {
        return res.status(400).json({status: 400, message: "Id must be present"});
    }

    let id = req.body._id;

    console.log(req.body);

    let todo;
    todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try {
        let updatedToDo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data: updatedToDo, message: "Updated successfully"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.removeTodo = async function(req, res, next) {
  let id = req.body._id;

  try {
      let removedTodo = await TodoService.deleteTodo(id);
      return res.status(204).json({status: 204, data: removedTodo, message: "remove successful"});
  }catch (e) {
      return res.status(400).json({status: 400, message: "remove unsuccessful"});
  }

};