import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {

}
