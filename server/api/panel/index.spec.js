'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var panelCtrlStub = {
  index: 'panelCtrl.index',
  show: 'panelCtrl.show',
  create: 'panelCtrl.create',
  update: 'panelCtrl.update',
  destroy: 'panelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var panelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './panel.controller': panelCtrlStub
});

describe('Panel API Router:', function() {

  it('should return an express router instance', function() {
    expect(panelIndex).to.equal(routerStub);
  });

  describe('GET /api/panels', function() {

    it('should route to panel.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'panelCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/panels/:id', function() {

    it('should route to panel.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'panelCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/panels', function() {

    it('should route to panel.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'panelCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/panels/:id', function() {

    it('should route to panel.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'panelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/panels/:id', function() {

    it('should route to panel.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'panelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/panels/:id', function() {

    it('should route to panel.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'panelCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
