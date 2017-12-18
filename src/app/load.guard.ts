import {Injectable} from '@angular/core';
import {CanLoad, Route, Router} from '@angular/router';
import {MessageService} from './messages/message.service';
import {Observable} from 'rxjs/Observable';
import {Message} from './messages/message.model';

@Injectable()
export class LoadGuard implements CanLoad {
  private loaded = false;

  constructor(private messages: MessageService,
              private router: Router) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {

    return this.loaded || new Promise<boolean>((resolve, reject) => {
      const responses: [[string, (string) => void]] = [
        ['Yes', () => {
          this.loaded = true;
          resolve(true);
        }],
        ['No', () => {
          this.router.navigateByUrl(this.router.url);
          resolve(false);
        }]
      ];

      this.messages.reportMessage(
        new Message('Do you want to load the module?',
          false, responses));
    });
  }
}
