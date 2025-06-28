import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavClass } from '../../../../../../utils/class/nav/nav-class';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { UserService } from '../../../../../../utils/services/user/user-service';
import { authenticationContainerRoutes } from '../authentication/authentication-container.routes';
import { signInContainerRoutes } from '../authentication/containers/sign-in/sign-in-container.routes';

@Component({
  selector: 'app-application-container',
  imports: [
    // components
    RouterOutlet,
    // directives
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './application-container.html',
  styleUrl: './application-container.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationContainer extends NavClass {

  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly userService = inject(UserService);

  public handleSignOut(): void {
    this.userService.signOut();
    this.toastService.success('You signed out successfully.');
    this.router.navigate(['/', authenticationContainerRoutes.path, signInContainerRoutes.path]);
  }

}
