import type { FormEvent, MouseEvent, ChangeEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import type { CityName, UserRegister } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { registerUser } from '../../store/action';
import { getRandomElement } from '../../utils';
import { AppRoute, CITIES, UserType } from '../../const';
import { setCity } from '../../store/site-process/site-process';

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<File | undefined>();

  const handleAvatarUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    setAvatar(evt.target.files[0]);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form) as Iterable<[UserRegister]>;
    const data = Object.fromEntries(formData);

    data.type = data.isPro ? UserType.Pro : UserType.Regular;
    delete data.isPro;
    dispatch(registerUser(data));
  };

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const cityName = e.currentTarget.textContent as CityName;
    dispatch(setCity(cityName));
  };

  return (
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign up</h1>
          <form className="login__form form register-form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Name</label>
              <input
                className="login__input form__input"
                type="text"
                name="name"
                placeholder="Name"
                required
                minLength={1}
                maxLength={15}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                minLength={6}
                maxLength={12}
              />
            </div>
            <div
              className="login__input-wrapper form__input-wrapper register-form__avatar-wrapper"
            >
              <input
                className="visually-hidden"
                type="file"
                name="avatar"
                id="avatar"
                accept="image/png, image/jpeg"
                onChange={handleAvatarUpload}
              />
              <label htmlFor="avatar" className="register-form__avatar-label">
                {avatar ? (
                  <img
                    src={URL.createObjectURL(avatar)}
                    alt="Avatar preview"
                    className="register-form__avatar-preview"
                  />
                ) : (
                  'Upload avatar'
                )}
              </label>
            </div>
            <div className="register-form__is-pro-wrapper">
              <input
                type="checkbox"
                name="isPro"
                id="isPro"
              />
              <label htmlFor="isPro" className="register-form__is-pro-label">
          Create pro account
              </label>
            </div>
            <button
              className="login__submit form__submit button"
              type="submit"
            >
                Sign up
            </button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <Link className="locations__item-link" onClick={handleLinkClick} to={AppRoute.Root}>
              <span>{getRandomElement<CityName>(CITIES)}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
