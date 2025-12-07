import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  host: { class: 'terminal-logo'},
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Logo {}
