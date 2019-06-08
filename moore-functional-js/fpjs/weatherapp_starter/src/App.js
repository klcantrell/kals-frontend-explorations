import { diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';
import axios from 'axios';
import * as R from 'ramda';

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode);
  function dispatch(msg) {
    const updates = update(msg, model);
    const updatesContainsSideEffects = R.type(updates) === 'Array';
    model = updatesContainsSideEffects ? updates[0] : updates;
    const command = updatesContainsSideEffects ? updates[1] : null;
    httpEffects(dispatch, command);
    const updatedView = view(dispatch, model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

function httpEffects(dispatch, command) {
  if (command === null) {
    return;
  }
  console.log(command);
  const { request, onSuccess, onError } = command;
  axios(request)
    .then(res => dispatch(onSuccess(res)))
    .catch(err => dispatch(onError(err)));
}

export default app;
