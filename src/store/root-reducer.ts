
import { combineReducers } from '@reduxjs/toolkit';

import { siteData } from './site-data/site-data';
import { siteProcess } from './site-process/site-process';
import { userProcess } from './user-process/user-process';
import { StoreSlice } from '../const';

export const rootReducer = combineReducers({
  [StoreSlice.SiteData]: siteData.reducer,
  [StoreSlice.SiteProcess]: siteProcess.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer,
});
