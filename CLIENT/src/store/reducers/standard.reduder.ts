import { ActionReducerMapBuilder, PayloadAction, createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { getStandard } from '../actions/standard.action';
import { StandarResponse } from '../../apis/item/standard/responses/standard.response';

export interface standardState {
  data: StandarResponse[];
  totalRecord: number;
  skip: number;
  totalPage: number;
}
const initState: standardState = {
  data: [],
  totalRecord: 0,
  skip: 0,
  totalPage: 0,
};

const standardReducer: ReducerWithInitialState<standardState> = createReducer(
  initState,
  (builder: ActionReducerMapBuilder<standardState>) =>
    builder.addCase(
      getStandard,
      (
        state: standardState,
        action: PayloadAction<{ data: StandarResponse[]; totalRecord: number; skip: number; totalPage: number }>,
      ) => {
        return (state = action.payload);
      },
    ),
);
export default standardReducer;
