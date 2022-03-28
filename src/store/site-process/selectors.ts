import { StoreSlice } from '../../const';
import type { State } from '../../types/state';
import type { City, SortName } from '../../types/types';

export const getCity = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): City => SITE_PROCESS.city;
export const getSorting = ({ [StoreSlice.SiteProcess]: SITE_PROCESS }: State): SortName => SITE_PROCESS.sorting;
