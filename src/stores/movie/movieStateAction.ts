import IMovieState from '../../interfaces/movie/IMovieState';
import IMovieStateData from '../../interfaces/movie/IMovieStateData';
import movieTypeEnum from './movieTypeEnum';

const addItem = (item: IMovieStateData) => ({
  type: movieTypeEnum.addItem, item,
});

const editPropertyStateByKey = (key: keyof IMovieState, value) => ({
  type: movieTypeEnum.editPropertyStateByKey,
  key,
  value,
});

const removeItem = (imdbID: any) => ({
  type: movieTypeEnum.removeItem, imdbID,
});

const reset = () => ({
  type: movieTypeEnum.reset,
});

const restoreData = (data: IMovieStateData[]) => ({
  type: movieTypeEnum.restoreData, data,
});

const restoreState = (state: IMovieState) => ({
  type: movieTypeEnum.restoreState, state,
});

const movieStateAction = {
  addItem,
  editPropertyStateByKey,
  removeItem,
  reset,
  restoreData,
  restoreState,
};

export default movieStateAction;
