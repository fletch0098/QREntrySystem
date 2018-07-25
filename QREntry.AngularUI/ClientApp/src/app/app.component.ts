import { Component } from '@angular/core';
import { ConfigService } from './shared/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '';

  constructor(/*private configService: ConfigService*/) {
    
  }

}
