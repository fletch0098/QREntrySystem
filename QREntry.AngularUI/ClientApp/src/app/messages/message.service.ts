import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable()
export class MessageService {
  messages: Message[] = [];

  add(messageType: string, messageText: string) {
    
    this.messages.push({ messageType, messageText} as Message);
  }

  clear() {
    this.messages = [];
  }
}
