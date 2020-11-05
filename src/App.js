import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import Photos from './components/Photos';

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
