import React from "react";

enum Indices {
  Layer0,
  Layer1,
  Layer2,
  Layer3,
  Layer4,
  Layer5,
  Layer6,
  Layer7,
  Layer8,
  Layer9,
  LayerMax = 99999,
}

export const Layers = {
  dropZone: Indices.Layer0,
  dragPreview: Indices.Layer1,
  widgetName: Indices.Layer2,
  apiPane: Indices.Layer3,
  help: Indices.Layer4,
  dynamicAutoComplete: Indices.Layer5,
  debugger: Indices.Layer6,
  productUpdates: Indices.Layer7,
  portals: Indices.Layer8,
  header: Indices.Layer9,
  appComments: Indices.Layer9,
  max: Indices.LayerMax,
};

export const LayersContext = React.createContext(Layers);
