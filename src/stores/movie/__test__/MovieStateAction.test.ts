import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../../index';
import IState from '../../../interfaces/IState';
import IMovieState from '../../../interfaces/movie/IMovieState';
import movieStateAction from '../movieStateAction';

describe('MovieStateAction Change', () => {
  it('test add item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let movieState: IMovieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(0);
    dispatch(movieStateAction.addItem({
      imdbID: 'imdbID',
      Poster: 'poster',
      Title: 'title',
      Type: 'type',
      Year: 'year',
    }) as any);
    state = getState() as IState;
    movieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(1);
  });

  it('test remove item', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let movieState: IMovieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(0);
    dispatch(movieStateAction.addItem({
      imdbID: 'imdbID',
      Poster: 'poster',
      Title: 'title',
      Type: 'type',
      Year: 'year',
    }));
    state = getState() as IState;
    movieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(1);

    dispatch(movieStateAction.removeItem('imdbID') as any);
    state = getState() as IState;
    movieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(0);
  });

  it('test restore data', () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    let state = getState() as IState;
    let movieState: IMovieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(0);
    dispatch(movieStateAction.restoreData([{
      imdbID: 'imdbID',
      Poster: 'poster',
      Title: 'title',
      Type: 'type',
      Year: 'year',
    }]) as any);
    state = getState() as IState;
    movieState = state?.movieState?.toJS() as IMovieState;
    expect(movieState.data.length).toBe(1);
  });
});
