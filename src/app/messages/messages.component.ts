import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: string[] = [];
  constructor(
    public messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.messagesService.getMessages()
      .subscribe(_messages => this.messages = _messages);
  }

}
