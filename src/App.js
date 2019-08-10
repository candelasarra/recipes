import React from 'react';
import AddNew from './components/AddNew/AddNew';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AddNew />
    </Router>
  );
};

export default App;
