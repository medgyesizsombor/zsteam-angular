import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Right as RightEnum} from 'src/app/api/enums/right.enum';
import { urls } from '../urls';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const right = localStorage.getItem('right');

    if (right && JSON.parse(right) === RightEnum.ADMIN) {
      return true;
      
    }

    this.router.navigate(['/' + urls.PRODUCTS]);
    return false;
  }
}
