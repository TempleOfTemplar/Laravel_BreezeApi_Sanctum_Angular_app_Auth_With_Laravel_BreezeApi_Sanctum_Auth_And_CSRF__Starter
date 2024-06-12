import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'not-found-page',
  standalone: true,
  imports: [
    MatProgressBar
  ],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
}
