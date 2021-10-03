import IAppState from './app/IAppState';
import IMovieState from './movie/IMovieState';
import IRouteState from './route/IRouteState';

interface IState {
  appState: IAppState,
  movieState: IMovieState,
  routeState: IRouteState,
}

export default IState;
