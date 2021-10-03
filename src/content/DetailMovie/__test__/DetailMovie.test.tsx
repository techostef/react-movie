import React from 'react';
import { render, screen } from '@testing-library/react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../stores/index';
import DetailMovie from '../DetailMovie';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('HomeHeader Render', () => {
  it('Render Detail Item', async () => {
    render((
      <Provider store={store}>
        <DetailMovie
          id=""
          history={undefined as any}
          match={{
            isExact: false,
            path: '',
            url: '',
            params: {
              id: '1',
            },
          }}
          location={undefined as any}
        />
      </Provider>
    ));

    await screen.findByText('Batman: The Killing Joke');
    await screen.findByText('(2016)');
    await screen.findByText('Animation, Action, Crime');
    await screen.findByText('25 Jul 2016');
    await screen.findByText('76 min');
    await screen.findByText('Sam Liu');
    await screen.findByText('Brian Azzarello, Brian Bolland, Bob Kane');
    await screen.findByText('Kevin Conroy, Mark Hamill, Tara Strong');
    await screen.findByText('English');
  });
});
