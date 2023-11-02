import { createAction } from '@reduxjs/toolkit';
import { PayloadActionCreator } from '@reduxjs/toolkit/src/createAction';
import { StandarResponse } from '../../apis/item/standard/responses/standard.response';

const getStandard: PayloadActionCreator<{
  data: StandarResponse[];
  totalRecord: number;
  skip: number;
  totalPage: number;
}> = createAction('GET_STANDARD');

export { getStandard };
