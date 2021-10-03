import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import IState from './interfaces/IState';
import RouteMain from './content/Main/RouteMain/RouteMain';

const mapStateToProps = (state: IState) => {
  return {
    isShowSidebar: state.appState.toJS().isShowSidebar,
  };
};

const mapDispatchToProps = () => {
  return {

  };
};

interface IApp {
  isShowSidebar: boolean,
}

const App: React.FC<IApp> = () => {
  return (
    <>
      <div className="container-app" style={{ display: 'flex' }}>
        <RouteMain />
      </div>
    </>
  );
};

App.defaultProps = {
};

App.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
