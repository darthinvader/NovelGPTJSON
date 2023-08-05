import { Component } from '@angular/core';
import { faArrowDown, faArrowUp, faDotCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-buttons',
  templateUrl: './scroll-buttons.component.html',
  styleUrls: ['./scroll-buttons.component.scss']
})
export class ScrollButtonsComponent {
  customClasses: string | string[] | Set<string> | { [klass: string]: any; } = '';

  faArrowUp = faArrowUp
  faArrowDown = faArrowDown
  faDotCircle = faDotCircle

  scrollToStart(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  scrollToMid(): void {
    const middle = (document.body.scrollHeight / 2);
    const adjustment = window.innerHeight / 2;
    const newScrollPosition = middle - adjustment;
    window.scrollTo({ top: newScrollPosition, behavior: 'smooth' });
  }

  scrollToEnd(): void {
    const end = document.body.scrollHeight;
    window.scrollTo({ top: end, behavior: 'smooth' });
  }
}
