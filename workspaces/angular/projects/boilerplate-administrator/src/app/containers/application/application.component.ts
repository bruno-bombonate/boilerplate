import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NavClass } from '../../../../../../utils/classes/nav.class';
import { UserService } from '../../../../../../utils/services/user/user.service';
import { ToastService } from '@bruno-bombonate/ngx-toast';
import { authenticationRoute } from '../authentication/authentication.route';
import { signInRoute } from '../authentication/containers/sign-in/sign-in.route';

@Component({
  selector: 'app-application',
  imports: [
    // components
    RouterOutlet,
    // directives
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationComponent extends NavClass {

  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  public readonly userService = inject(UserService);

  public handleSignOut(): void {
    this.userService.signOut();
    this.toastService.success('You signed out successfully.');
    this.router.navigate(['/', authenticationRoute.path, signInRoute.path]);
  }

}
