import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';
  bool = true;
  toggleBool() {
    this.bool = !this.bool;
  }

  errorFunction() {
    var fakeFuncs = [{ func: function () {} }];
    fakeFuncs[1].func();
  }
}
