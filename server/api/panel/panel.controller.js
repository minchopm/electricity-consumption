/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/panels              ->  index
 * POST    /api/panels              ->  create
 * GET     /api/panels/:id          ->  show
 * PUT     /api/panels/:id          ->  update
 * DELETE  /api/panels/:id          ->  destroy
 */

'use strict';

import _ from "lodash";
import Panel from "./panel.model";

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function saveUpdates(updates) {
  return function (entity) {
    if (entity) {
      var updated = _.merge(entity, updates);
      return updated.save()
        .then(updated => {
          return updated;
        });
    }
  };
}

function removeEntity(res) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Panels
export function index(req, res) {
  console.log(req.query)
  var panelPower = 0.2;
  var panelCostOfPower = [3, 2];
  var years = [30, 20];


  var panelCost = panelPower * panelCostOfPower[req.query.selectedIndex] * 1000;
  var totalConsumption = req.query.electricityConsumption;
  var efficientConsumption = totalConsumption * 8 / 24;
  var efficientEnergyPercents = req.query.solarEnergy / 100;
  var desiredConsumption = efficientConsumption * efficientEnergyPercents;
  var panels = Math.ceil(desiredConsumption / (30 * 8 * panelPower));

  var totalCost = panels * panelPower * panelCostOfPower[req.query.selectedIndex] * 1000;

  var cost = desiredConsumption * req.query.costOfPower;
  var electricityProviderEnergy = (totalConsumption - desiredConsumption) * req.query.costOfPower;

  var currentYear = new Date().getFullYear();
  var yAxis = [];
  var xAxis = [];
  for (let j = 0; j < years[req.query.selectedIndex]; j++) {
    yAxis.push((-totalCost + j * 12 * cost).toFixed(2));
    xAxis.push(currentYear + j)
  }


  var entity = {
    data: cost ? [cost * 12 * years[req.query.selectedIndex].toFixed(2), electricityProviderEnergy * 12 * years[req.query.selectedIndex].toFixed(2)] : [0, 100],
    panels,
    panelCost,
    totalCost,
    yAxis,
    xAxis,
    years: years[req.query.selectedIndex]
  }
  return res.status(200).json(entity);
}

// Gets a single Panel from the DB
export function show(req, res) {
  return Panel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Panel in the DB
export function create(req, res) {
  return Panel.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Panel in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Panel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Panel from the DB
export function destroy(req, res) {
  return Panel.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
