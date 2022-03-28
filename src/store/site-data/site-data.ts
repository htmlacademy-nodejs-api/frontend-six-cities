import { createSlice } from '@reduxjs/toolkit';

import type { SiteData } from '../../types/state';
import { StoreSlice, SubmitStatus } from '../../const';
import { fetchOffers, fetchOffer, fetchPremiumOffers, fetchComments, postComment, postFavorite, deleteFavorite, fetchFavoriteOffers, postOffer, editOffer } from '../action';

const initialState: SiteData = {
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
  premiumOffers: [],
  comments: [],
  commentStatus: SubmitStatus.Still,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(postOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(editOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.favoriteOffers = state.favoriteOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.premiumOffers = state.premiumOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
      })
      .addCase(fetchPremiumOffers.fulfilled, (state, action) => {
        state.premiumOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.commentStatus = SubmitStatus.Pending;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.commentStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postComment.rejected, (state) => {
        state.commentStatus = SubmitStatus.Rejected;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.premiumOffers = state.premiumOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.premiumOffers = state.premiumOffers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer);
        state.favoriteOffers = state.favoriteOffers.filter((favoriteOffer) => favoriteOffer.id !== updatedOffer.id);

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
      });
  }
});
