export type OverlayCloseEventType = 'backdropClick' | 'close' | string | null;

/**
 * event type on close modal(e.g. on button close or backdrop click)
 *
 * @template D - type of close data
 * @template T - event type, possible extend type for custom events for close modal
 */
export interface OverlayCloseEvent<D, T extends OverlayCloseEventType = OverlayCloseEventType> {
  type: T;
  data: D;
}
