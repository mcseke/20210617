import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFlightBooking from './flight-booking.reducer';
import { FlightBookingAppState, State } from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

// Create feature selector
export const selectFlightBooking = createFeatureSelector<State>('flightBooking');

// Use feature selector to get data from feature branch
export const selectFlights = createSelector(selectFlightBooking, s => s.flights);

export const negativeList = createSelector(selectFlightBooking, s => s.negativeList);

export const selectedFilteredFlights = createSelector(
  selectFlights,
  negativeList,
  (flights, negativeList) => flights.filter(f => !negativeList.includes(f.id))
);

export const selectFlightsWithParam = (blockedFlights: number[]) => createSelector(
  selectFlights,
  (flights) => flights.filter(f => !blockedFlights.includes(f.id))
);
