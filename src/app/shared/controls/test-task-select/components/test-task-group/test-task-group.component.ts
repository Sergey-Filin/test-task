import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test-task-group',
  templateUrl: './test-task-group.component.html',
  styleUrls: ['./test-task-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestTaskGroupComponent {

}
