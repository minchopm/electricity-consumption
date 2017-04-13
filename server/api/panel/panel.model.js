'use strict';

import mongoose from 'mongoose';

var PanelSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Panel', PanelSchema);
