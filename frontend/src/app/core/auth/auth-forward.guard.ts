import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";
import {inject} from "@angular/core";
import {Location} from "@angular/common";

export const authForwardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService = inject(AuthService);
  const location: Location = inject(Location);

  if (authService.getIsLoggedIn()) {
    location.back();
    return false;
  }
  return true;
};
