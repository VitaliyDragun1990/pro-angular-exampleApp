import {Injectable} from '@angular/core';
import {MessageService} from '../messages/message.service';
import {ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot} from '@angular/router';
import {FormComponent} from './form.component';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Message} from '../messages/message.model';

@Injectable()
export class UnsavedGuard implements CanDeactivate<FormComponent> {

  constructor(private messages: MessageService,
              private router: Router) {
  }

  canDeactivate(component: FormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (component.editing) {
      if (['name', 'category', 'price']
          .some(prop => component.product[prop] !== component.originalProduct[prop])) {
        const subject = new Subject<boolean>();

        const response: [[string, (string) => void]] = [
          ['Yes', () => {
          subject.next(true);
          subject.complete();
          }],
          ['No', () => {
          this.router.navigateByUrl(this.router.url);
          subject.next(false);
          subject.complete();
          }]
        ];
        this.messages.reportMessage(new Message('Discard Changes?',
          true, response));
        return subject;
      }
    }
    return true;
  }
}
