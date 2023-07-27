import { Injectable } from '@angular/core';
import { TestTaskSelectComponent } from "../components/test-task-select/test-task-select.component";

@Injectable()
export class TestTaskSelectService {

  private select: TestTaskSelectComponent;

  register(select: TestTaskSelectComponent): void {
    this.select = select;
  }

  getSelect(): TestTaskSelectComponent {
    return this.select;
  }
}
