const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
const { STRING } = Sequelize;

const UUID = Sequelize.DataTypes.UUID;
const UUIDV4 = Sequelize.DataTypes.UUIDV4;

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/music-api-testing-db'
);

const Artist = conn.define('artist', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(255),
  },
});

const Album = conn.define('album', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artistId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(255),
  },
});

const Song = conn.define('song', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  artistId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING(255),
  },
  duration: {
    type: INTEGER,
  },
});

const Track = conn.define('track', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  idx: {
    type: INTEGER,
  },
  songId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  albumId: {
    type: UUID,
    defaultValue: UUIDV4,
  },
});

Artist.hasMany(Album);
Artist.hasMany(Song);
Song.hasMany(Track);
Album.hasMany(Track);

const syncAndSeed = async () => {
  try {
    await conn.sync({ force: true });
    const [mozart, monet, snoopDogg] = await Promise.all([
      Artist.create({ name: 'Mozart' }),
      Artist.create({ name: 'Monet' }),
      Artist.create({ name: 'Snoop Dogg' }),
    ]);
    const [pianoMan, painterMan, doggieStyle] = await Promise.all([
      Album.create({ name: 'Piano Man', artistId: mozart.id }),
      Album.create({ name: 'Painter Man', artistId: monet.id }),
      Album.create({ name: 'DoggieStyle', artistId: snoopDogg.id }),

      Song.create({ name: 'amedeus', artistId: mozart.id }),
      Song.create({ name: 'water lillies', artistId: monet.id }),
      Song.create({ name: 'what my name', artistId: snoopDogg.id }),
    ]);

    const [amedeus, waterLillies, whatsMyName] = await Promise.all([
      Song.create({ name: 'amedeus', artistId: mozart.id }),
      Song.create({ name: 'water lillies', artistId: monet.id }),
      Song.create({ name: 'what my name', artistId: snoopDogg.id }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Artist,
  Album,
  Song,
  syncAndSeed,
};
