import { useCallback } from 'react';


import type { CityName } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCity } from '../../store/site-process/site-process';
import City from '../city/city';
import { CITIES } from '../../const';
import { getCity } from '../../store/site-process/selectors';

const CitiesList = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(getCity);

  const handleCityClick = useCallback((name: CityName) => {
    dispatch(setCity(name));
  }, [dispatch]);

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <City key={city} name={city} isActive={city === activeCity.name} onClick={handleCityClick} />
      ))}
    </ul>
  );
};

export default CitiesList;
