'use strict';

var app = require('../..');
import request from 'supertest';

var newPanel;

describe('Panel API:', function() {

  describe('GET /api/panels', function() {
    var panels;

    beforeEach(function(done) {
      request(app)
        .get('/api/panels')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panels = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(panels).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/panels', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/panels')
        .send({
          name: 'New Panel',
          info: 'This is the brand new panel!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPanel = res.body;
          done();
        });
    });

    it('should respond with the newly created panel', function() {
      expect(newPanel.name).to.equal('New Panel');
      expect(newPanel.info).to.equal('This is the brand new panel!!!');
    });

  });

  describe('GET /api/panels/:id', function() {
    var panel;

    beforeEach(function(done) {
      request(app)
        .get('/api/panels/' + newPanel._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          panel = res.body;
          done();
        });
    });

    afterEach(function() {
      panel = {};
    });

    it('should respond with the requested panel', function() {
      expect(panel.name).to.equal('New Panel');
      expect(panel.info).to.equal('This is the brand new panel!!!');
    });

  });

  describe('PUT /api/panels/:id', function() {
    var updatedPanel;

    beforeEach(function(done) {
      request(app)
        .put('/api/panels/' + newPanel._id)
        .send({
          name: 'Updated Panel',
          info: 'This is the updated panel!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPanel = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPanel = {};
    });

    it('should respond with the updated panel', function() {
      expect(updatedPanel.name).to.equal('Updated Panel');
      expect(updatedPanel.info).to.equal('This is the updated panel!!!');
    });

  });

  describe('DELETE /api/panels/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/panels/' + newPanel._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when panel does not exist', function(done) {
      request(app)
        .delete('/api/panels/' + newPanel._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
