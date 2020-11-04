import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Main';
import Photos from './Photos';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/photos'>
            <Photos />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
