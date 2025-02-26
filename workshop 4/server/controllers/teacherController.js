const Teacher = require("../models/teacherModel");

/**
 * Crear un profesor
 */
const teacherCreate = (req, res) => {
  console.log("Solicitud POST recibida en /api/teachers");
  console.log("Body recibido:", req.body); // <---- Verifica que se imprimen los datos aquí

  let teacher = new Teacher(req.body);

  teacher.save()
    .then(() => {
      res.status(201);
      res.header({ 'location': `/teachers/?id=${teacher.id}` });
      res.json(teacher);
    })
    .catch((err) => {
      res.status(422);
      console.log('Error al guardar el profesor', err);
      res.json({ error: 'Error al guardar el profesor' });
    });
};


/**
 * Obtener todos los profesores
 */
const teacherGet = (req, res) => {
  Teacher.find()
    .then(teachers => {
      res.json(teachers);
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Obtener un profesor por ID
 */
const teacherGetById = (req, res) => {
  const { id } = req.params;

  Teacher.findById(id)
    .then(teacher => {
      if (!teacher) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json(teacher);
    })
    .catch(err => {
      console.error("Error al obtener el profesor:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    });
};

/**
 * Actualizar un profesor por ID
 */
const teacherUpdate = (req, res) => {
  const { id } = req.params;

  Teacher.findByIdAndUpdate(id, req.body, { new: true })
    .then(updatedTeacher => {
      if (!updatedTeacher) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json(updatedTeacher);
    })
    .catch(err => {
      res.status(500).json({ error: "Error al actualizar el profesor", details: err });
    });
};

/**
 * Eliminar un profesor por ID
 */
const teacherDelete = (req, res) => {
  const { id } = req.params;

  Teacher.findByIdAndDelete(id)
    .then(deletedTeacher => {
      if (!deletedTeacher) {
        return res.status(404).json({ error: "Profesor no encontrado" });
      }
      res.json({ message: "Profesor eliminado exitosamente" });
    })
    .catch(err => {
      res.status(500).json({ error: "Error al eliminar el profesor", details: err });
    });
};

module.exports = {
  teacherCreate,
  teacherGet,
  teacherGetById,
  teacherUpdate,
  teacherDelete
};