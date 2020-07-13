/**
 * Renderer process file
 *
 * @file renderer.js
 * @author Sam George
 * @since 1.2.0
 */

import React from 'react';
import ReactDOM from 'react-dom';

const domNode = document.getElementById('root');

const Renderer = () => (
  <>
    <h3>Sample electron and react application</h3>
    <p>This is a sample application developed with electron, react and webpack</p>
  </>
);

ReactDOM.render(
  <Renderer />,
  domNode
);
