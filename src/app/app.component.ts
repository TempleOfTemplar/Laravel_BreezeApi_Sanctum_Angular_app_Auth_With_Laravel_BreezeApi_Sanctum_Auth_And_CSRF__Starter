import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppHeaderComponent} from "./components/layout/app-header/app-header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, AppHeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    // animations: [slideInAnimation]
})
export class AppComponent {
    title = 'frontend';
}
