import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootStore from '../../../stores/index';
import HomeHeader from '../HomeHeader';

const store = createStore(rootStore, applyMiddleware(thunk));

describe('HomeHeader Render', () => {
  it('Render Without Crash', () => {
    render((
      <Provider store={store}>
        <HomeHeader />
      </Provider>
    ));
  });
  it('Test autocomplate searchbox', async () => {
    render((
      <Provider store={store}>
        <HomeHeader />
      </Provider>
    ));
    const input = await screen.findByTestId('autocomplate-searchbox');
    await userEvent.type(input.querySelector('input') as any, 'batman');
    setTimeout(async () => {
      const listSuggest = document.getElementsByClassName('ant-select-item-option');
      await waitFor(() => expect(listSuggest).toBeInTheDocument());
      expect(listSuggest.length).toBe(10);
    }, 1500);
  });
  it('Test search item', async () => {
    render((
      <Provider store={store}>
        <HomeHeader />
      </Provider>
    ));
    const input = await screen.findByTestId('autocomplate-searchbox');
    await userEvent.type(input.querySelector('input') as any, 'batman{enter}');
    setTimeout(async () => {
      const listSuggest = document.getElementsByClassName('ant-list-item');
      await waitFor(() => expect(listSuggest).toBeInTheDocument());
      expect(listSuggest.length).toBe(10);
    }, 1500);
  });
});
