import IMovieStateData from './IMovieStateData';

interface IEditItemByKeyMovie {
  key: keyof IMovieStateData,
  value: any,
  id?: any,
}

export default IEditItemByKeyMovie;
