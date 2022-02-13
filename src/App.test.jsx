import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  waitFor,
  logRoles
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

jest.mock('axios');

import axios from 'axios';
import App from './App';
import users from './mockUsers';

describe('should mock axios requests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should mock axios request for users, including cancelToken', async () => {

    const cancelTokenSource = { 
      cancel: jest.fn(), 
      token: { 
        reason: { 
          message: 'user cancelled' 
        }
      } 
    };

    jest.spyOn(axios.CancelToken, 'source').mockReturnValueOnce(cancelTokenSource);

    jest.spyOn(axios, 'get').mockResolvedValueOnce({data: users.data });

    render(<App />);

    screen.queryByRole('heading', { name: 'CancelToken demo'});

    await waitFor(() => {

      expect(axios.CancelToken.source).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('https://reqres.in/api/users?page=1');
    })
    
  });

});