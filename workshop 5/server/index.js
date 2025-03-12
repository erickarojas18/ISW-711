const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // <-- IMPORTAR AQUÍ

app.use(express.json());
app.use(bodyParser.json()); // <-- AHORA SÍ FUNCIONA
app.use(cors());

// Conexión a MongoDB
mongoose.connect("mongodb+srv://erickaborge13:quhVilO9WAVZxyqs@cluster0.svymq.mongodb.net/teachers", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB:', err));

// Importar controladores
const { teacherCreate, teacherGet, teacherGetById, teacherUpdate, teacherDelete } = require('./controllers/teacherController');
const { courseCreate, courseGet, courseGetById, courseUpdate, courseDelete } = require('./controllers/courseController'); // <-- Asegúrate de que este archivo existe

// Rutas de los profesores
app.post('/api/teachers', teacherCreate);
app.get('/api/teachers', teacherGet);
app.get('/api/teachers/:id', teacherGetById);
app.put('/api/teachers/:id', teacherUpdate);
app.delete('/api/teachers/:id', teacherDelete);

// Rutas de los cursos
app.post('/api/courses', courseCreate);
app.get("/api/courses", courseGet);
app.get("/api/courses/:id", courseGetById);
app.put("/api/courses/:id", courseUpdate);
app.delete("/api/courses/:id", courseDelete);

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000!'));
