const { expect } = require('chai');
const { syncAndSeed, Artist, Album, Song } = require('./db');

describe('Models', () => {
  let seed;
  beforeEach(async () => {
    await syncAndSeed();
  });
  describe('seeded data', () => {
    it('includes three artists', async () => {
      const artists = await Artist.findAll();
      expect(artists.length).to.equal(3);
    });

    // it('artist name is string', async () => {
    //   const artists = await Artist.findAll();
    //   // expect(typeof artists[1].name === 'string');
    //   expect(typeof artists[1].name).to.equal('string');
    // });

    it('artists includes name "Snoop Dogg"', async () => {
      const artist = await Artist.findAll({
        where: { name: 'Snoop Dogg' },
      });
      expect(artist[0].name).to.equal('Snoop Dogg');
    });

    it('confirm 3 albums', async () => {
      const albums = await Album.findAll();
      expect(albums.length).to.equal(3);
    });

    it('confirm 3 songs', async () => {
      const songs = await Song.findAll();
      expect(songs.length).to.equal(3);
    });
  });
});
