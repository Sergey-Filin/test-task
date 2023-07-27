import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, Optional } from '@angular/core';
import { TestTaskIconRegistryService } from "@modules/test-task-icons/services/test-task-icon-registry.service";
import { TestTaskIconColor, TestTaskIconColorList } from "@modules/test-task-icons/testTaskIcons";
import { DOCUMENT } from "@angular/common";
import { TestTaskIcon } from "@modules/test-task-icons/models/test-task-icon";

@Component({
  selector: 'app-test-task-icon',
  templateUrl: './test-task-icon.component.html',
  styleUrls: ['./test-task-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TestTaskIconComponent {
  private svgIcon: SVGElement;
  private iconName: TestTaskIcon;
  private iconColor: TestTaskIconColor;
  private strokeColor: TestTaskIconColor;
  private iconWidth: string | number;
  private iconHeight: string | number;
  private mouseover: boolean;

  @Input()
  set name(iconName: TestTaskIcon | undefined) {
    if (!iconName || iconName === this.iconName) {
      return;
    }
    this.iconName = iconName;
    if (this.svgIcon) {
      this.elementRef.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.testTaskIconRegistryService.getIcon(iconName);
    if (!svgData) {
      return;
    }
    this.svgIcon = this.svgElementFromString(svgData);
    if (this.iconColor) {
      this.svgIcon.style.fill = this.findColor(this.iconColor);
    }
    if (this.strokeColor) {
      this.svgIcon.style.stroke = this.findColor(this.strokeColor);
    }
    if (this.iconWidth) {
      this.svgIcon.setAttribute('width', `${this.iconWidth}px`);
    }
    if (this.iconHeight) {
      this.svgIcon.setAttribute('height', `${this.iconHeight}px`);
    }
    this.elementRef.nativeElement.appendChild(this.svgIcon);
  }

  @Input()
  set color(color: TestTaskIconColor) {
    this.iconColor = color;
    if (this.svgIcon && color) {
      this.svgIcon.setAttribute('fill', this.findColor(color));
    }
  }

  @Input() hoverColor: TestTaskIconColor;

  @HostListener('mouseover')
  onMouseOver(): void {
    if (this.mouseover) {
      return;
    }
    this.mouseover = true;
    if (this.hoverColor) {
      const color = this.hoverColor;
      const svg = this.svgIcon;
      this.fillPaths(svg, color);
    }
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    if (!this.mouseover || !this.hoverColor) {
      return;
    }
    this.mouseover = false;
    const color = this.iconColor;
    const svg = this.svgIcon;
    this.fillPaths(svg, color);
  }

  constructor(
    private readonly elementRef: ElementRef,
    private readonly testTaskIconRegistryService: TestTaskIconRegistryService,
    @Optional() @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  private findColor(color: TestTaskIconColor): string {
    const selectedColor = TestTaskIconColorList.find((item) => item.name === color);
    if (!selectedColor) {
      return '#ffffff';
    }
    return selectedColor.color;
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return (
      div.querySelector('svg') ||
      this.document.createElementNS('http://www.w3.org/2000/svg', 'path')
    );
  }

  private fillPaths(svg: SVGElement, color: TestTaskIconColor): void {
    const paths = svg?.querySelectorAll('path');
    if (!paths || !paths.length) {
      return;
    }
    Array.from(paths).forEach((item) => {
      item.setAttribute('fill', this.findColor(color));
    });
  }
}
