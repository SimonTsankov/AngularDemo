import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';

  getUrl() {
    return "https://www.xmple.com/wallpaper/purple-white-gradient-linear-2560x1600-c2-9370db-ffffff-a-60-f-14.svg"
  }
}
