const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Express App', () => {
    it('should return a message from GET /app', () => {
      return supertest(app)
        .get('/app')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            const apps = res.body[0];
            expect(apps).to.include.all.keys(
                'App', 'Rating', 'Genres'
            );    
        });
  });

    it('should sort by rating', () => {
      return supertest(app)
        .get('/app')
        .query({ sort: 'Rating' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
            let sorted = true;

            let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const appAtI = res.body[i];
          const appAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (appAtIPlus1.Rating < appAtI.Rating) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
        });
    });        
});