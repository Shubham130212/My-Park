import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  userServ = inject(UserService);
  router = inject(Router)

  logOff() {
    localStorage.removeItem('parkUser');
    this.router.navigate(['/login']);
  }
}
