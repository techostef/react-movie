import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DetailMovie from '../../DetailMovie/DetailMovie';
import Home from '../../Home/Home';

const mapStateToProps = () => {
};

interface IRouteMain {
}

const RouteMain: React.FC<IRouteMain> = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/detail/:id" component={DetailMovie} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

RouteMain.defaultProps = {
};

RouteMain.propTypes = {
};

export default connect(mapStateToProps, null)(React.memo(RouteMain));
