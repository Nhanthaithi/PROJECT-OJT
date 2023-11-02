import { createReducer } from '@reduxjs/toolkit';
import { refreshAction } from '../actions/category.action';

const initialState = false;

const refreshReducer = createReducer(initialState, (builder) => {
  builder.addCase(refreshAction, (state) => {
    return (state = !state);
  });
});

export default refreshReducer;
