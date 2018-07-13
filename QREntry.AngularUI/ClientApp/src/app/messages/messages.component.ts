import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

  delete(message: Message): void {
    this.messageService.messages = this.messageService.messages.filter(h => h !== message);
    //this.memoryService.deleteMemory(memory).subscribe();
  }

}
