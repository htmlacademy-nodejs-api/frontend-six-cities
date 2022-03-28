import { CITIES, Sorting, TYPES, UserType } from '../const';

export type CityName = typeof CITIES[number];
export type Type = typeof TYPES[number];
export type SortName = keyof typeof Sorting;

export type Location = {
  latitude: number;
  longitude: number;
};

export type City = {
  name: CityName;
  location: Location;
};

export type User = {
  name: string;
  avatarUrl: string;
  type: UserType;
  email: string;
};

export type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type Offer = {
  id: string;
  price: number;
  rating: number;
  title: string;
  isPremium: boolean;
  isFavorite: boolean;
  city: City;
  location: Location;
  previewImage: string;
  type: Type;
  bedrooms: number;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  maxAdults: number;
};

export type NewOffer = {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  isPremium: boolean;
  type: Type;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  location: Location;
  images: string[];
};

export type NewComment = Pick<Comment, 'comment' | 'rating'>;
export type UserAuth = Pick<User, 'email'> & { password: string };
export type CommentAuth = NewComment &
  Pick<Offer, 'id'>;
export type FavoriteAuth = Offer['id'];
export type UserRegister = Omit<User, 'avatarUrl'> &
  Pick<UserAuth, 'password'> & { avatar?: File };
