import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootStore from '../../index';
import IState from '../../../interfaces/IState';
import IMovieState from '../../../interfaces/movie/IMovieState';
import movieBusinessAction from '../movieBusinessAction';

describe('MovieBusinessAction test', () => {
  it('test getFetchData', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    await dispatch(movieBusinessAction.getFetchData({ i: 'bataman' }) as any);
    const state = getState() as IState;
    const movieState: IMovieState = state?.movieState.toJS() as IMovieState;
    expect(movieState.data.length).toBe(10);
  });
  it('test loadMoreData', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    await dispatch(movieBusinessAction.getFetchData({ i: 'bataman' }) as any);
    await dispatch(movieBusinessAction.loadMoreData('bataman', 2) as any);
    const state = getState() as IState;
    const movieState: IMovieState = state?.movieState.toJS() as IMovieState;
    expect(movieState.data.length).toBe(20);
  });
  it('test firstSearchData', async () => {
    const store = createStore(rootStore, applyMiddleware(thunk));
    const { getState, dispatch } = store;
    await dispatch(movieBusinessAction.loadMoreData('bataman', 2) as any);
    await dispatch(movieBusinessAction.firstSearchData({ i: 'bataman' }) as any);
    const state = getState() as IState;
    const movieState: IMovieState = state?.movieState.toJS() as IMovieState;
    expect(movieState.data.length).toBe(10);
  });
});
