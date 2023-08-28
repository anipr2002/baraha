import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import './styles/main.css'; // Import your stylesheet here
import Blog from './components/Blog';
import EditBlog from './components/EditBlog';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Blog} />
          <Route path="/edit/:id" component={EditBlog} />
          <Route path="/new" component={EditBlog} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
