import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [SideNavComponent]
})
export class HomeModule { }
