const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Conectar a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/cursos-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("connected", () => console.log("Conexión exitosa a MongoDB"));
db.on("error", (err) => console.error("Error al conectar con MongoDB:", err));

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Modelos
const Profesor = mongoose.model('Profesor', new mongoose.Schema({
  nombre: String
}));

const Curso = mongoose.model('Curso', new mongoose.Schema({
  nombre: String,
  codigo: String,
  descripcion: String,
  profesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Profesor' }
}));

// Rutas para cursos
app.get('/api/cursos', async (req, res) => {
  const cursos = await Curso.find().populate('profesor');
  res.json(cursos);
});

app.post('/api/cursos', async (req, res) => {
  const nuevoCurso = new Curso(req.body);
  await nuevoCurso.save();
  res.status(201).json(nuevoCurso);
});

app.put('/api/cursos/:id', async (req, res) => {
  const cursoActualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cursoActualizado);
});

app.delete('/api/cursos/:id', async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Rutas para profesores
app.get('/api/profesores', async (req, res) => {
  const profesores = await Profesor.find();
  res.json(profesores);
});

app.post('/api/profesores', async (req, res) => {
  const nuevoProfesor = new Profesor(req.body);
  await nuevoProfesor.save();
  res.status(201).json(nuevoProfesor);
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor ejecutándose en el puerto 3000"));
