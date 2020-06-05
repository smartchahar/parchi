import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [SideNavComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [SideNavComponent]
})
export class HomeModule { }
