const {expect, spy} = require('chai');
const request = require('supertest');
const exressus = require('../index.js');

describe('expressus', () => {
    let app;
    let server;

    beforeEach(() => app = exressus());

    afterEach(() => server && server.close());

    it('should initialize the framework', () => {
        expect(app).not.to.be.null;
    });

    it('should start the server', () => {
        const server = app.listen(3000);
        expect(server.listening).to.be.true;
    });

    it('should be able to register a function to a path', (done) => {
        app.get('/', (req, res) => {
            res.end('Hello World!');
        });

        request(app).get('/').expect(200, 'Hello World!', done);
    });
});