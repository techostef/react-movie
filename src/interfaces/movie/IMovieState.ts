import IImmutableMap from '../IImmutableMap';
import IMovieStateData from './IMovieStateData';

interface IMovieStateMain {
  data: IMovieStateData[],
  isLoading: boolean,
  pageNumber: number,
  search: string,
  totalItems: number,
  year: string,
}

interface IMovieState extends IImmutableMap<IMovieStateMain> {
  data: IMovieStateData[],
  isLoading: boolean,
  pageNumber: number,
  search: string,
  totalItems: number,
  year: string,
}

export default IMovieState;
