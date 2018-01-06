const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');


const ToDoSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

ToDoSchema.plugin(function () {

}, mongoosePaginate);
const ToDo = mongoose.model('Todo', ToDoSchema);

module.exports = ToDo;

