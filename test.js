const assert = require('assert');
const { expect } = require('chai');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;
const before = mocha.before;
const after = mocha.after;

const {
  crearAnime,
  listarAnime,
  obtenerAnimePorId,
  obtenerAnimePorNombre,
  actualizarAnime,
  eliminarAnime,
} = require('./index');

describe('Pruebas para las funciones de anime', () => {
  beforeEach(() => {
    // Reiniciar los datos antes de cada prueba
    crearAnime('1', 'Akira', 'Seinen', '1988', 'Katsuhiro Otomo');
    crearAnime('2', 'Dragon Ball', 'Shonen', '1986', 'Akira Toriyama');
    crearAnime('3', 'Sailor Moon Crystal', 'Shojo', '2014', 'Naoko Takeuchi');
  });

  afterEach(() => {
    // Limpiar los datos después de cada prueba
    eliminarAnime('1');
    eliminarAnime('2');
    eliminarAnime('3');
    eliminarAnime('4');
    eliminarAnime('6');
  });

  it('Debería crear un nuevo anime', () => {
    const nuevoAnimeId = '4';
    const nuevoAnime = {
      nombre: 'One Piece',
      genero: 'Shonen',
      año: '1999',
      autor: 'Eiichiro Oda',
    };

    crearAnime(nuevoAnimeId, nuevoAnime.nombre, nuevoAnime.genero, nuevoAnime.año, nuevoAnime.autor);

    const animes = listarAnime();
    assert.equal(animes[nuevoAnimeId].nombre, nuevoAnime.nombre);
  });

  it('Debería listar todos los animes', () => {
    const animes = listarAnime();
    assert.equal(Object.keys(animes).length, 3);
  });

  it('Debería obtener un anime por ID', () => {
    const animeId = '2';
    const anime = obtenerAnimePorId(animeId);

    assert.equal(anime.nombre, 'Dragon Ball');
  });

  it('Debería obtener un anime por nombre', () => {
    const anime = obtenerAnimePorNombre('Test Anime 2');
    expect(anime).to.deep.equal({
      nombre: 'Test Anime 2',
      genero: 'Test',
      año: '2023',
      autor: 'Test Author 2',
    });
  });
  

  it('Debería actualizar un anime', () => {
    const animeId = '3';
    const nuevoNombre = 'Sailor Moon Crystal';
    const nuevoGenero = 'Shojo';
    const nuevoAño = '2014';
    const nuevoAutor = 'Naoko Takeuchi';

    actualizarAnime(animeId, nuevoNombre, nuevoGenero, nuevoAño, nuevoAutor);

    const animeActualizado = obtenerAnimePorId(animeId);
    assert.equal(animeActualizado.nombre, nuevoNombre);
    assert.equal(animeActualizado.genero, nuevoGenero);
    assert.equal(animeActualizado.año, nuevoAño);
    assert.equal(animeActualizado.autor, nuevoAutor);
  });

  it('Debería eliminar un anime', () => {
    const animeId = '2';

    eliminarAnime(animeId);

    const animes = listarAnime();
    assert.equal(Object.keys(animes).length, 2);
    assert.equal(animes.hasOwnProperty(animeId), false);
  });
});
