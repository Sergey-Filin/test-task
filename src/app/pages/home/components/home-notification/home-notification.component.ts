import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { MODAL_DATA } from "@modules/modal";

@Component({
  selector: 'app-home-notification',
  templateUrl: './home-notification.component.html',
  styleUrls: ['./home-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNotificationComponent {

  title: string = '';

  constructor(
    @Inject(MODAL_DATA) modalData: string,
  ) {
    this.title = modalData;
  }
}
