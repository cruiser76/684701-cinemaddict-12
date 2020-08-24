import {RenderPosition} from './../const.js';
import AbstractComponent from './../view/abstract.js';

export const createElement = (template) => {
  const elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;

  return elementWrapper.firstChild;
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const render = (container, component, position) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (component instanceof AbstractComponent) {
    component = component.getElement();
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
    case RenderPosition.AFTER:
      container.after(component);
      break;
    case RenderPosition.BEFORE:
      container.before(component);
      break;
  }
};
