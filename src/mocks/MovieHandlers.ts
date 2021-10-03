import { rest } from 'msw';
import config from '../config';
import dummy from './dummy.json';
import dummySingle from './dummySingle.json';

const { SERVICE_URL } = config;
export default [
  rest.get(SERVICE_URL, (req, res, ctx) => {
    const title = req.url.searchParams.get('i');
    const plot = req.url.searchParams.get('plot');
    const isDetailItem = title && plot === 'full';
    if (isDetailItem) {
      return res(
        ctx.json(dummySingle),
      );
    }
    return res(
      ctx.json(dummy),
    );
  }),
];
