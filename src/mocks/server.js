import { setupServer } from 'msw/node';
import MovieHandlers from './MovieHandlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...MovieHandlers);
