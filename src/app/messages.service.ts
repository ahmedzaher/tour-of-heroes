import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: string[] = []
  constructor() { }
  
  getMessages(): Observable<string[]> {
    return of(this.messages);
  }
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
