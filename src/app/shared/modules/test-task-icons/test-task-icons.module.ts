import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTaskIconComponent } from './components/test-task-icon/test-task-icon.component';
import { TestTaskIconRegistryService } from "./services/test-task-icon-registry.service";

function testTaskIconRegistryServiceFactory(): TestTaskIconRegistryService {
  return new TestTaskIconRegistryService();
}

@NgModule({
  declarations: [TestTaskIconComponent],
  imports: [CommonModule],
  exports: [TestTaskIconComponent],
})
export class TestTaskIconsModule {
  static forRoot(): ModuleWithProviders<TestTaskIconsModule> {
    return {
      ngModule: TestTaskIconsModule,
      providers: [
        {
          provide: TestTaskIconRegistryService,
          useFactory: testTaskIconRegistryServiceFactory,
        },
      ],
    };
  }
}
