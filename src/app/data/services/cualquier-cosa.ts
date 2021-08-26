import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CualquierCosa {
  movil$: BehaviorSubject<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.movil$ = new BehaviorSubject(false);

    this.breakpointObserver
      .observe(['(max-width: 800px)'])
      .pipe(map((x) => x.matches))
      .subscribe((x) => this.movil$.next(x));
  }
}
