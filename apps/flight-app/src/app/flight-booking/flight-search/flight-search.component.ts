/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, OnInit} from '@angular/core';
import { Flight, FlightService } from '@flight-workspace/flight-lib';
import { FlightBookingAppState } from '../+state/flight-booking.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { flightsLoaded, loadFlights, updateFlight } from '../+state/flight-booking.actions';
import { take } from 'rxjs/operators';
import { selectedFilteredFlights } from '../+state/flight-booking.selectors';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  urgent = false;

  flights$: Observable<Flight[]>;

  get flights() {
    return this.flightService.flights;
  }

  // "shopping basket" with selected flights
  basket: { [id: number]: boolean } = {
    3: true,
    5: true
  };

  constructor(
    private flightService: FlightService,
    private store: Store<FlightBookingAppState>) {
  }

  ngOnInit() {
    console.log('onInit');
    this.flights$ = this.store.select(selectedFilteredFlights);
  }

  search(): void {
    if (!this.from || !this.to) return;

    // New:
    this.store.dispatch(loadFlights({
      from: this.from,
      to: this.to,
      urgent: this.urgent
    }));


    // this.flightService
    //   .find(this.from, this.to, this.urgent)
    //   .subscribe(
    //     flights => {
    //       this.store.dispatch(flightsLoaded({flights}));
    //     },
    //     error => {
    //       console.error('error', error);
    //     }
    //   );
  }

  delay(): void {

    this.flights$.pipe(take(1)).subscribe(flights => {
      const flight = flights[0];

      const oldDate = new Date(flight.date);
      const newDate = new Date(oldDate.getTime() + 15 * 60 * 1000);
      const newFlight = { ...flight, date: newDate.toISOString() };

      this.store.dispatch(updateFlight({flight: newFlight}));
    });
  }

}
