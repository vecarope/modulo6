const fs = require('fs');

const data = fs.readFileSync('anime.json');
const animeData = JSON.parse(data);

// Agregar nuevo anime al JSON
function crearAnime(id, nombre, genero, año, autor)
{
  animeData[ id ] = {
    nombre,
    genero,
    año,
    autor,
  };
  guardarCambios();
}

// Leer todos los animes
function listarAnime()
{
  return animeData;
}

// Leer anime por ID
function obtenerAnimePorId(id)
{
  return animeData[ id ];
}

// Leer anime por nombre
function obtenerAnimePorNombre(nombre) {
  const animes = Object.values(animeData);
  const animeEncontrado = animes.find(
    (anime) => anime.nombre.toLowerCase() === nombre.toLowerCase()
  );

  return animeEncontrado || null;
}
// Actualizar anime



// Eliminar anime
function eliminarAnime(id)
{
  if (animeData.hasOwnProperty(id))
  {
    delete animeData[ id ];
    guardarCambios();
  }
}

// Guardar cambios en el JSON
function guardarCambios()
{
  fs.writeFileSync('anime.json', JSON.stringify(animeData, null, 2));
}

// Ejemplo de uso:
crearAnime('6', 'One Piece', 'Shonen', '1999', 'Eiichiro Oda');

const animes = listarAnime();
console.log(animes);

const animePorId = obtenerAnimePorId('2');
console.log(animePorId);

const animePorNombre = obtenerAnimePorNombre('Akira');
console.log(animePorNombre);

actualizarAnime('3', 'Sailor Moon Crystal', 'Shojo', '2014', 'Naoko Takeuchi');

eliminarAnime('5');


module.exports = {
  crearAnime,
  listarAnime,
  obtenerAnimePorId,
  obtenerAnimePorNombre,
  actualizarAnime,
  eliminarAnime,
};