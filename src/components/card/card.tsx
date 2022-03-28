import { memo } from 'react';
import { Link } from 'react-router-dom';

import type { Offer } from '../../types/types';
import { AppRoute } from '../../const';
import { capitalize, getStarsWidth } from '../../utils';
import Bookmark from '../bookmark/bookmark';

type CardProps = Offer & {
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  isMini?: boolean;
  classPrefix?: string;
};

const Card = ({
  id,
  price,
  rating,
  title,
  isPremium,
  isFavorite,
  previewImage,
  type,
  isMini = false,
  classPrefix = 'cities',
  onMouseEnter = () => void 0,
  onMouseLeave = () => void 0,
}: CardProps): JSX.Element => {
  const handleMouseEnter = () => {
    onMouseEnter(id);
  };

  return (
    <article
      className={`${classPrefix}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${classPrefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Property}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={isMini ? 150 : 260}
            height={isMini ? 110 : 200}
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark id={id} isActive={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: getStarsWidth(rating),
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Property}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
};

export default memo(Card, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
