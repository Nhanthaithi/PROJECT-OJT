import { StandarResponse } from '../apis/item/standard/responses/standard.response';

export interface RootState {
  itemReducer: { data: StandarResponse[]; totalRecord: number };
}
