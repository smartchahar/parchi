import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  opened = false;
  matches = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.opened = !this.opened;
  }

  navigateTo() {
    this.matches = true;
    this.router.navigate(['matches'], {relativeTo: this.route});
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
