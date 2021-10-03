import { Map } from 'immutable';
import IMovieState from '../../interfaces/movie/IMovieState';
import movieTypeEnum from './movieTypeEnum';

const initData: IMovieState = {
  data: [],
  isLoading: false,
  pageNumber: 1,
  toJS: undefined as any,
  search: '',
  totalItems: 0,
  year: '',
};

const init = Map(initData as any);

const movieState = (state = init, action: any) => {
  let newState: IMovieState;
  switch (action.type) {
    case movieTypeEnum.addItem:
      newState = state.toJS() as unknown as IMovieState;
      return Map({
        ...newState,
        data: [...newState.data, action.item],
      });

    case movieTypeEnum.reset:
      return init;

    case movieTypeEnum.removeItem:
      newState = state.toJS() as unknown as IMovieState;
      const idx = newState.data?.findIndex((item) => item?.imdbID === action?.imdbID);
      if (idx === -1) return Map(newState);
      newState.data.splice(idx, 1);
      return Map({
        ...state.toJS(),
        data: newState.data,
        selectedItems: [],
      });

    case movieTypeEnum.restoreData:
      return Map({
        ...state.toJS(),
        data: action.data,
        selectedItems: [],
      });

    case movieTypeEnum.editPropertyStateByKey:
      newState = state.toJS() as unknown as IMovieState;
      newState[action.key] = action.value;
      return Map({
        ...newState,
      });

    default:
      return state;
  }
};

export default movieState;
