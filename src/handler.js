const { nanoid } = require("nanoid");
const notes = require("./notes");

exports.addhandler = (request, h) => {
  const { title, body, tags } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Created Succesfully",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "Failed",
    message: "Failed to create",
  });
  response.code(500);
  return response;
};

exports.getNotes = () => ({
  status: "success",
  data: {
    notes,
  },
});

exports.getNote = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.id === id)[0];
  if (note !== "undefined") {
    return {
      status: "success",
      data: { note },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

exports.editNote = (request, h) => {
  const { id } = request.params;
  const { title, body, tags } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], title, body, tags, updatedAt };
    const response = h.response({
      status: "success",
      message: "Edit notes success",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

exports.deleteNote = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
