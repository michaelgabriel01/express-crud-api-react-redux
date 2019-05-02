import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

const request = require('supertest');
const App = require('./App');

//==================== note API test ====================

/**
 * Testing get all note endpoint
 */
describe('GET /notes', function () {
    it('respond with json containing a list of all notes', function (done) {
        request(App)
            .get('/api/v1/notes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a note endpoint by giving an existing note
 */
describe('GET /notes/:id', function () {
    it('respond with json containing a single note', function (done) {
        request(App)
            .get('/notes/U001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a note endpoint by giving a non-existing note
 */
describe('GET /notes/:id', function () {
    it('respond with json note not found', function (done) {
        request(App)
            .get('/notes/idisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('"note not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post note endpoint
 */
describe('POST /notes', function () {
    let data = {
        "id": "1",
        "title": "For test 1",
        "message": "This is post test"
    }
    it('respond with 201 created', function (done) {
        request(App)
            .post('/notes')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post notes endpoint
 */
describe('POST /notes', function () {
    let data = {
        //no id
        "title": "For test 2",
        "message": "This is post test"
    }
    it('respond with 400 not created', function (done) {
        request(App)
            .post('/notes')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"note not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});