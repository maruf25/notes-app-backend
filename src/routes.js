const handler = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: handler.addhandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: handler.getNotes,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: handler.getNote,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: handler.editNote,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: handler.deleteNote,
  },
];

module.exports = routes;
