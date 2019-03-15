// 64 | 22480
// 64 | 22384

// More info about these options:
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
const DEFAULT_LAZYLOAD_CONFIG = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 50px'

  // root: document.body // Scroll container element. Defaults to viewport.
  // threshold: 0 // Fraction of element that must be in view to trigger intersection.
};

// Detect browser support for window.requestAnimationFrame for invoking callback function:
const INVOKE: string =
  'requestAnimationFrame' in window ? 'requestAnimationFrame' : 'setTimeout';

// Experimental way to keep track of which elements are already being observed:
// const watchlist = [];

/**
 * Helper to trigger a callback when element scrolls into viewport.
 * @param target {element} Required. The element to observe when scrolling etc.
 * @param callback {function} Required. Callback to invoke when element is scrolled into view.
 * @param config {object} Optional. Intersection Observer Options. See https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
 */
export default function observeScrollIntoView(
  target: Element,
  callback: Function,
  config = DEFAULT_LAZYLOAD_CONFIG
): boolean {
  if (
    'IntersectionObserver' in window &&
    callback /* && !~watchlist.indexOf(target) */
  ) {
    // Prepare the callback method with arguments:
    const context = this;
    const callbackWithArgs = callback.bind(context, target);

    // Init our IntersectionObserver:
    // watchlist.push(target);
    const observer = new IntersectionObserver(onIntersection, config);
    observer.observe(target);

    function onIntersection(entries) {
      //entries.forEach(testIntersection);

      // If we are in the viewport then top watching and load the image:
      // Note we can't use for...of because we must support IE11.
      for (let entry in entries) {
        if (entries[entry].isIntersecting) {
          // Stop observing the element:
          // watchlist.splice(watchlist.indexOf(target), 1);
          observer.unobserve(target);

          // Trigger callback using the most modern technique that the browser supports:
          // Ideally use requestAnimationFrame to reduce the impact of the callback on the user's experience.
          window[INVOKE](callbackWithArgs);
        }
      }
    }

    return true;
  } else {
    // Let caller know that browser does not support IntersectionObserver:
    return false;
  }
}
