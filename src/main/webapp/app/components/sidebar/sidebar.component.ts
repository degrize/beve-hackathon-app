import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/ma-papg', title: 'Ma Page', icon: 'ni-planet text-blue', class: '' },
  { path: '/don-page', title: 'Mes Dons', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/profile', title: 'profile', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/logout', title: 'Deconnexion', icon: 'ni-key-25 text-info', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] | undefined;
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });
  }
}
