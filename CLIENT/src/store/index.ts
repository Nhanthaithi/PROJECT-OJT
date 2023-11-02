import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

import authReducer from './reducers/auth.reduder';
import categoryReducer from './reducers/category.reducer';
import refreshReducer from './reducers/category-refresh.reducer';
import shopWarehouseReducer from './reducers/ShopWarehouse.reducers';
import itemReducer from './reducers/item.reducer';
import standardReducer from './reducers/standard.reduder';

const rootReducer = combineReducers({
  authReducer,
  categoryReducer,
  refreshReducer,
  shopWarehouseReducer,
  itemReducer,
  standardReducer,
});

const store: ToolkitStore = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
