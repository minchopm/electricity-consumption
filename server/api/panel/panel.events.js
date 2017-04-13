/**
 * Panel model events
 */

'use strict';

import {EventEmitter} from 'events';
import Panel from './panel.model';
var PanelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PanelEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Panel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    PanelEvents.emit(event + ':' + doc._id, doc);
    PanelEvents.emit(event, doc);
  }
}

export default PanelEvents;
