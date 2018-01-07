class ToDo {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: string;

  constructor() {
    this.title = "";
    this.description = "";
    this.date = new Date();
    this.status = "";
  }
}

/*
Each module can optionally export a default export. Default exports are marked with the keyword default; and there can only be one default export per module. default exports are imported using a different import form.

default exports are really handy. For instance, a library like JQuery might have a default export of jQuery or $, which we’d probably also import under the name $ or jQuery.

 */

export default ToDo;
