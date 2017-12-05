import {Component} from '@angular/core';
import {Message} from './message.model';
import {MessageService} from './message.service';

@Component({
  selector: 'app-messages',
  templateUrl: 'message.component.html'
})
export class MessageComponent {
  lastMessage: Message;

  constructor(messageService: MessageService) {
    messageService.messages.subscribe(m => this.lastMessage = m);
  }
}
