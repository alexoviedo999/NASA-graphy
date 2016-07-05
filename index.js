import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App';
import PicResults from './components/picResults';
import PicView from './components/PicView';
// debugger;
ReactDOM.render(
  <Router history={hashHistory}>
    <Route component={App} path='/'>
      {/*<IndexRoute component={App}>*/}
      {/*</IndexRoute>*/}
    </Route>
    <Route component={PicView} path="picview"/>
  </Router>,
  document.getElementById('root')
);
