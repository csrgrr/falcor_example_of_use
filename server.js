// npm install
// EJECUTAR CON node server.js, LUEGO ABRIR EN http://localhost:3000/cliente.html.
var falcorExpress = require('falcor-express');
var Router = require('falcor-router');

var express = require('express');
var app = express();

app.use('/model.json', falcorExpress.dataSourceRoute(function (req, res) {
  // create a Virtual JSON resource with single key ("greeting")
  return new Router([
    {
      // match a request for the key "greeting"    
      route: "greeting",
      // respond with a PathValue with the value of "Hello World."
      get: function() {
        return {path:["greeting"], value: "Hello World"};
      }
    }
  ]);
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'));
var server = app.listen(3000, () => console.log('Server on port 3000'));

//--------------------------------------------------------
// CASO DE CONEXIÓN A BD REAL CON MONGODB
//--------------------------------------------------------
// // npm install mongoose
// const mongoose = require('mongoose');

// // Conexión a la base de datos MongoDB
// mongoose.connect('mongodb://localhost:27017/falcor_movies', { useNewUrlParser: true, useUnifiedTopology: true });

// // Definición del esquema de la película
// const movieSchema = new mongoose.Schema({
//   title: String,
//   year: Number
// });

// // Modelo de película
// const Movie = mongoose.model('Movie', movieSchema);

// // Configuración de la ruta Falcor
// const MoviesRouter = require('falcor-router')([
//   {
//     route: 'moviesById[{integers:indices}]["title", "year"]',
//     get: function(pathSet) {
//       const indices = pathSet.indices;
//       return Movie.find({ _id: { $in: indices } }).then(movies => {
//         const results = [];
//         movies.forEach(movie => {
//           const index = indices.indexOf(movie._id);
//           pathSet[2].forEach(property => {
//             results.push({
//               path: ['moviesById', index, property],
//               value: movie[property]
//             });
//           });
//         });
//         return results;
//       });
//     }
//   }
// ]);

// // Usar Falcor como middleware
// app.use('/model.json', FalcorServer.dataSourceRoute(() => new MoviesRouter()));
