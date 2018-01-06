//getting model
const ToDo = require('../models/todo.model')

_this = this;


exports.getTodos = async function (query, page, limit) {
    let options = {
        page,
        limit
    };
    try {
        let todos = await ToDo.paginate(query, options);
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
};

exports.createTodo = async function (todo) {

    let newTodo = new ToDo({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    });

    try {
        let savedTodo = await newTodo.save();
        return savedTodo;
    } catch (e) {
        throw Error("Error while Creating Todo")
    }
};

exports.updateTodo = async function (todo) {
    let id = todo.id;

    try {
        let oldTodo = await ToDo.findById(id);
        if (!oldTodo) {
            return false;
        }
        console.log(oldTodo);
        oldTodo.title = todo.title;
        oldTodo.description = todo.description;
        oldTodo.status = todo.status;
        let savedTodo = await oldTodo.save();
        return savedTodo;
    } catch (e) {
        throw Error("Error occured while Finding the Todo")
    }


};

exports.deleteTodo = async function (id) {

    try {
        let deleted = await ToDo.remove({_id: id})
        if (deleted.result.n !== "0") {
            return deleted;
        } else {
            throw Error("Todo Could not be deleted")
        }
    } catch (e) {
        throw Error("Error occurred while Deleting the Todo")
    }
};