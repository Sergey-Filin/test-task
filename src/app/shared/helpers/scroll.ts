import {fromEvent, Observable, of} from 'rxjs';

export const scrollableClass = 'main-wrap__scrollable';
export const pointerEventAbleClass = 'main-wrap__events';
export const cdkBlockClass = 'cdk-global-scrollblock';

export const html = (): HTMLElement | null => {
  if (!window) {
    return null;
  }
  const hmlTag = document.getElementsByTagName('html');
  return hmlTag && hmlTag[0] || null;
};

export const mainWrapper = (): HTMLElement | null => {
  if (!window) {
    return null;
  }
  const wrapper = window.document.getElementById('main-wrap');
  return wrapper || null;
};

export const header = (): HTMLElement | null => {
  if (!window) {
    return null;
  }
  const wrapper = window.document.getElementById('header');
  return wrapper || null;
};

export const scrollTop = (behavior: ScrollBehavior = 'auto'): void => {
  const wrapper = mainWrapper();
  if (wrapper) {
    wrapper.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  }
};

export const scrollToPos = (top: number, left: number, behavior: ScrollBehavior = 'auto'): void => {
  const wrapper = mainWrapper();
  if (wrapper) {
    wrapper.scrollTo({
      top,
      left,
      behavior,
    });
  }
};

export const addScroll = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.add(scrollableClass);
    wrapper.classList.remove(cdkBlockClass);

  }
};

export const removeScroll = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.remove(scrollableClass);
    wrapper.classList.add(cdkBlockClass);
  }
};

export const addPointerEvents = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.add(pointerEventAbleClass);
  }
};

export const removePointerEvents = (): void => {
  const wrapper = mainWrapper();
  const htmlTag = html();
  if (wrapper && htmlTag) {
    wrapper.classList.remove(pointerEventAbleClass);
  }
};

export const onScrollMainWrapper = (): Observable<Event | null> => {
  const wrapper = mainWrapper();
  if (!wrapper) {
    return of(null);
  }
  return fromEvent(wrapper, 'scroll');
};

/**
 * scroll to element on page
 * use this fn for scroll instead window scroll top
 *
 * @param el - html element ref for scroll
 * @param offset - additional offset
 * @param animate - use false value for sync set scroll position
 */
export const scrollToContainer = (el: HTMLElement | undefined, offset = 0, animate = true): void => {
  if (!el) {
    return;
  }
  const wrapper = mainWrapper();
  if (!wrapper) {
    return;
  }
  const headerEl = header();
  const headerOffset = headerEl?.offsetHeight || 0;
  const wrapperScrolled = wrapper.scrollTop;
  const rect = el.getBoundingClientRect();
  const {top} = rect;
  const scrollTopPos = top + wrapperScrolled - headerOffset - offset;
  if (animate) {
    return wrapper.scrollTo({top: scrollTopPos, behavior: 'smooth'});
  }
  wrapper.scrollTop = top + wrapperScrolled - headerOffset - offset;

};

/**
 * get scrollbar width
 */
export const getScrollBarWidth = (): number => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll'; // forcing scrollbar to appear
  const parentNode = document.body;
  parentNode.appendChild(outer);

  const inner = document.createElement('div');
  outer.appendChild(inner);

  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  parentNode.removeChild(outer);
  return scrollbarWidth;
};
