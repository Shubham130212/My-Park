import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserModel, User } from '../../model/user.model';
import { inject } from '@angular/core';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html', 
  styleUrl: './login.css',
})
export class Login {
  loginObj: User = new User();
  userServ=inject(UserService);
  router=inject(Router);

  showToast = false;
  toastMessage = '';

  onLogin(){
    this.userServ.loginUser(this.loginObj).subscribe({
      next: (res: IUserModel) => {
        localStorage.setItem('parkUser',JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.displayToast('Wrong Credentials');
      }
    });
  }

  displayToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
