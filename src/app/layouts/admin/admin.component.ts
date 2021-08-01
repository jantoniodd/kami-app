import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  opened = false;
  mode = 'side';
  isToolbar = false;

  omenus: Array<{ link: string; nombre: string }> = [
    {
      link: '/candidatos',
      nombre: 'Candidatos',
    },
    {
      link: '/trabajadores',
      nombre: 'Trabajadores',
    },
    {
      link: '/areas',
      nombre: 'Areas',
    },
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 800px)']).subscribe((res) => {
      this.opened = !res.matches;

      if (res.matches) {
        this.isToolbar = true;
        this.mode = 'over';
      } else {
        this.isToolbar = false;
        this.mode = 'side';
      }
    });
  }
  ngOnInit() {}
}
