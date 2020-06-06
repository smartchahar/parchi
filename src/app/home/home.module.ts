import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home.component';
import { SidebarModule } from 'ng-sidebar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatchesComponent } from './matches/matches.component';

@NgModule({
  declarations: [SideNavComponent, HomeComponent, MatchesComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SidebarModule.forRoot(),
    MatToolbarModule
  ],
  exports: [SideNavComponent]
})
export class HomeModule { }
