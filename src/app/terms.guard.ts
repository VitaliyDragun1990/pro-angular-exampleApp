import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {MessageService} from './messages/message.service';
import {Observable} from 'rxjs/Observable';
import {Message} from './messages/message.model';

@Injectable()
export class TermsGuard implements CanActivate, CanActivateChild {

  constructor(private messages: MessageService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {

    if (route.params['mode'] === 'create') {
      return new Promise<boolean>((resolve, reject) => {
        const responses: [[string, (string) => void]] = [
          ['Yes', () => resolve(true)],
          ['No', () => {
            this.router.navigateByUrl(this.router.url);
            resolve(false);
          }]
        ];
        this.messages.reportMessage(
          new Message('Do you accept the terms & conditions?',
            false, responses));
      });
    } else {
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {

    if (route.url.length > 0
      && route.url[route.url.length - 1].path === 'categories') {

      return new Promise<boolean>((resolve, reject) => {
        const responses: [[string, (string) => void]] = [
          ['Yes', () => resolve(true)],
          ['No ', () => {
            this.router.navigateByUrl(state.url.replace('categories', 'products'));
            resolve(false);
          }]
        ];
        this.messages.reportMessage(
          new Message('Do you want to see the categories component?', false, responses));
      });
    } else {
      return true;
    }
  }
}
