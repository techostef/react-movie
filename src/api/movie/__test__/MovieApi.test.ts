import { AxiosResponse } from 'axios';
import MovieApi from '../MovieApi';

describe('Movie Api', () => {
  it('get items', async () => {
    let data = [];
    await MovieApi.getItems().then((res: AxiosResponse) => {
      data = res?.data?.Search;
    });
    expect(data.length).toBe(10);
  });
  it('get item detail', async () => {
    await MovieApi.getItem('test').then((res: AxiosResponse) => {
      expect(res?.data?.Title).toBe('Batman: The Killing Joke');
    });
  });
});
