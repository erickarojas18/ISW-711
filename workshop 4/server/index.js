const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');

// Conexión a la base de datos
mongoose.connect("mongodb+srv://erickaborge13:quhVilO9WAVZxyqs@cluster0.svymq.mongodb.net/teachers", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.log('Error al conectar a MongoDB:', err);
  });

// Procesar el cuerpo de la solicitud
app.use(bodyParser.json());

// Verificación de CORS
app.use(cors({
  origin: '*', // Permite solicitudes desde cualquier origen
  methods: "*", // Permite todos los métodos HTTP
}));

// Importar controladores
const { teacherCreate, teacherGet, teacherGetById, teacherUpdate, teacherDelete } = require('./controllers/teacherController');
const { courseCreate, courseGet, courseGetById, courseUpdate, courseDelete } = require('./controllers/courseController');
console.log("Servidor iniciado y escuchando peticiones...");

// Rutas de los profesores
app.post('/api/teachers', teacherCreate); // Crear profesor
app.get("/api/teachers", teacherGet); // Obtener todos los profesores
app.get("/api/teachers/:id", teacherGetById); // Obtener profesor por ID
app.put("/api/teachers/:id", teacherUpdate); // Actualizar profesor
app.delete("/api/teachers/:id", teacherDelete); // Eliminar profesor

// Rutas de los cursos
app.post('/api/courses', courseCreate); // Crear curso
app.get("/api/courses", courseGet); // Obtener todos los cursos
app.get("/api/courses/:id", courseGetById); // Obtener curso por ID
app.put("/api/courses/:id", courseUpdate); // Actualizar curso
app.delete("/api/courses/:id", courseDelete); // Eliminar curso

// Iniciar el servidor
app.listen(3000, () => console.log('Servidor corriendo en el puerto 3000!'));