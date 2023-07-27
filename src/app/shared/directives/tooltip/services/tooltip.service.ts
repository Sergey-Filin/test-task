import {
  ComponentType,
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {
  ComponentRef,
  ElementRef,
  Injectable,
} from '@angular/core';

import {TooltipComponent} from '../components/tooltip/tooltip.component';

@Injectable()
export class TooltipService {

  constructor(
    private readonly overlay: Overlay,
  ) {
  }

  create(
    host: ElementRef,
    content: string | any,
    positions: ConnectedPosition[],
    portalComponent?: ComponentType<any>,
    config?: OverlayConfig,
  ): OverlayRef {
    const positionStrategy = this.getPositionStrategy(host, positions);
    const scrollStrategy = this.overlay.scrollStrategies.close();
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      disposeOnNavigation: true,
      positionStrategy,
      scrollStrategy,
      ...(config || {}),
    });

    const component = portalComponent || TooltipComponent;
    const tooltipPortal = new ComponentPortal(component);
    const tooltipRef: ComponentRef<any> = overlayRef.attach(tooltipPortal);
    tooltipRef.instance.data = content;
    overlayRef.updatePosition();
    return overlayRef;
  }

  private getPositionStrategy(host: ElementRef, positions: ConnectedPosition[]): PositionStrategy {
    return this.overlay
      .position()
      .flexibleConnectedTo(host)
      .withPositions(positions)
      .withFlexibleDimensions(false);
  }
}
