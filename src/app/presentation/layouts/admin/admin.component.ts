import { Component, OnInit } from '@angular/core';
import { CualquierCosa } from '../../../data/services/cualquier-cosa';

@Component({
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  opened = false;
  mode = 'side';
  isToolbar = false;

  omenus: Array<{ link: string; nombre: string }> = [
    {
      link: '/postulantes',
      nombre: 'Postulantes',
    },
  ];

  constructor(private abz: CualquierCosa) {
    abz.movil$.subscribe((m) => {
      this.opened = !m;

      if (m) {
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
