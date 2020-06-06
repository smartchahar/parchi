import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { NavigationGuard } from '../utils/guards/navigation.guard';
import { MatchesComponent } from './matches/matches.component';
import { SideNavComponent } from './side-nav/side-nav.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NavigationGuard],
    children: [
      { path: '',
        component: SideNavComponent,
        canActivate: [NavigationGuard],
        children: [
          { path: 'matches',
            component: MatchesComponent,
            canActivate: [NavigationGuard]
          }
        ]}
    ]
  },
  {
    path: 'matches',
    component: MatchesComponent,
    canActivate: [NavigationGuard],
    outlet: 'mai'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }