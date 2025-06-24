import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { RoutingConstants } from './shared/constants/routing.constants';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: RoutingConstants.HOME,
        pathMatch: 'full',
      },
      {
        path: RoutingConstants.HOME,
        loadChildren: () => import('./pages/home/home-routing.module').then(m => m.HomeModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: RoutingConstants.HOME,
  },
];
