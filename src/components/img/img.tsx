// TODO: Consider supporting other img attributes: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
// TODO: Reset lazyload states if src is changed.
// TODO: Consider "offline" detection & fallback.

import { Component, Prop, Element, Event, EventEmitter } from '@stencil/core';

// Custom helpers for link component:
import observeScrollIntoView from '../../helpers/dom/observeScrollIntoView';

/**
 * Component aup-img
 * @param {fallback} Content of this slot will be displayed only if image fails to load.
 */
@Component({
  tag: 'lazy-img',
  styleUrl: 'img.scss',
  shadow: true
})
export class ImgComponent {
  /** Optional. The alternative text description of the image.
   * Omit this for *decorative* images and it will default to an empty string.
   * When should I set the alt attribute? https://www.w3.org/WAI/tutorials/images/decision-tree/
   */
  @Prop() alt!: string;

  /** Required. The image URL.
   * More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-src
   */
  @Prop() src: string;

  /** Optional. A comma separated list of one or more strings
   * indicating a set of possible image sources for the user agent to use.
   * More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset
   */
  @Prop() srcset: string;

  /** Optional. A comma separated list of one or more strings indicating a set of source sizes.
   * Each source size consists of:
   * - a media condition. This must be omitted for the last item.
   * - a source size value.
   * More info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-sizes
   * */
  @Prop() sizes: string;

  /**
   * Optional. Used to calculate aspect ratio when both `width` and `height` have been specified.
   * Setting these correctly will prevent reflow when image finally loads.
   * Note: This does not have the same effect as the standard img `width` attribute.
   * Similar to amp-img: https://www.ampproject.org/docs/reference/components/amp-img
   * Also see: https://github.com/ojanvafai/intrinsicsize-attribute
   */
  @Prop() width: string;

  /**
   * Optional. Used to calculate aspect ratio when both `width` and `height` have been specified.
   * Setting these correctly will prevent reflow when image finally loads.
   * Note: This does not have the same effect as the standard img `height` attribute.
   * Similar to amp-img: https://www.ampproject.org/docs/reference/components/amp-img
   * Also see: https://github.com/ojanvafai/intrinsicsize-attribute
   */
  @Prop() height: string;

  /**
   * Optional. Specify how the image will display within the component.
   * Similar to amp-img layout: https://www.ampproject.org/docs/design/responsive/control_layout
   * When height and width are specified, the component will size itself using height/width aspect ratio.
   * - responsive: Component will adjust to native image size after it loads.
   * - fixed: Image will distort to fit both height and width of component.
   * - cover: Image will zoom in to fit either height or width of component.
   * - contain: Image will zoom out to fit within height and width of component.
   */
  @Prop() layout: 'responsive' | 'fixed' | 'cover' | 'contain' = 'cover';

  /**
   * Optional. When set, the image will not be fetched until it is scrolled into view.
   * Recommended for faster page load.
   */
  @Prop() lazyload: boolean = true;

  /**
   * Optional. When this is set, no element will be rendered for a spinner animation while waiting for load.
   */
  @Prop() noloading: boolean;

  /**
   * Optional. Emit user events such as `lazyloading` and `tracking`.
   * For example img load events may be needed for analytics tracking.
   */
  @Prop() withEvents: boolean = false;

  // The component has 4 states. You'll see them one at a time as an attribute on the host element:
  @Prop({ mutable: true, reflectToAttr: true }) lazing: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) loading: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) loaded: boolean;
  @Prop({ mutable: true, reflectToAttr: true }) fallback: boolean;

  // For internal/dev use only: When this is set, the component will remain in whichever state was specified as an attribute on the host:
  // The state attributes are: lazing, loading, loaded, fallback.
  @Prop() forceState: boolean;

  /**
   * This component emits `tracking` events for the tracking component to handle.
   */
  @Event() tracking: EventEmitter;

  /**
   * This component emits `lazyloading` event when it is scrolled into view.
   */
  @Event() lazyloading: EventEmitter;

  // TODO: Expose this feature if it becomes needed:
  // // Reset the `loaded` flag when src is changed:
  // @Watch('src')
  // srcChange(/* newValue, oldValue*/) {
  //   reset.call(this);
  // }

  // Private: This component:
  @Element() host: HTMLDivElement;

  // Private: Used internally if it can be calculated from height/width:
  private aspectRatio: number;

  componentWillLoad() {
    reset.call(this);
  }

  componentDidLoad() {
    const { lazyload, lazing, loaded, host, onAwake } = this;

    if (lazyload && lazing && !loaded) {
      // Initialise an Intersection Observer that will tell us when this component is scrolled into viewport:
      const isLazyloadable = observeScrollIntoView.call(this, host, onAwake);

      // In browsers that don't support the lazyload technique we must load img immediately :(
      if (!isLazyloadable) {
        onAwake();
      }
    }
  }

  // Called when lazyload is triggered by scroll: Raise custom lazyloading event:
  // Typically when user has scrolled far enough to reach this component.
  onAwake = () => {
    // Set flag to trigger re-render img with src attribute set, so it can load:
    if (!this.forceState) {
      this.lazing = false;
      this.loading = true;
    }

    console.log('onAwake');
  };

  // Called when image finishes loading. Raise custom load event:
  onLoad = () => {
    // Set flag to trigger re-render that will hide placeholder and unhide image:
    if (!this.forceState) {
      this.loading = false;
      this.loaded = true;
    }
  };

  onError = () => {
    // Set flag to trigger re-render to show error fallback if specified:
    if (!this.forceState) {
      this.loading = false;
      this.fallback = true;
    }
  };

  render() {
    const {
      // Public attrs:
      alt,
      src,
      srcset,
      sizes,
      layout,
      noloading,
      lazing,
      loading,

      // Private props:
      aspectRatio,
      loaded,
      fallback,
      onLoad,
      onError
    } = this;
    let placeholderElem;
    let aspectRatioSizer;

    const imgState = lazing
      ? 'lazing'
      : loading
      ? 'loading'
      : loaded
      ? 'loaded'
      : 'fallback';

    const className = `img img-${layout || 'responsive'} img-${imgState}`;
    const isResponsive = !layout || layout === 'responsive';

    if (!(isResponsive && loaded)) {
      aspectRatioSizer = (
        <i
          aria-hidden="true"
          class="aspect-sizer"
          style={
            aspectRatio
              ? {
                  paddingTop: 100 * aspectRatio + '%'
                }
              : null
          }
        />
      );
    }

    // Show alternative content while loading:
    if (loading) {
      // By default the placeholder slot will contain an element that can be styled as a spinner:
      placeholderElem = (
        <div class="placeholder" aria-hidden="true">
          <slot name="placeholder" />
          {loading && aspectRatio && !noloading ? (
            <i class="loading-indicator" />
          ) : null}
        </div>
      );
    } else if (fallback) {
      placeholderElem = (
        <div class="error fallback" aria-hidden="true">
          <slot name="fallback" />
        </div>
      );
    }

    // Tip: The alt.trim() fixes cases where an author has accidentally provided only whitespace.
    // Tip: We toggle the hidden attribute so that brands can customise a css transition.
    return [
      aspectRatioSizer,
      placeholderElem,
      <img
        src={lazing ? null : src}
        srcset={lazing ? null : srcset}
        sizes={sizes}
        alt={alt ? alt.trim() : ''}
        class={className}
        hidden={lazing || fallback}
        onLoad={onLoad}
        onError={onError}
      />
    ];
  }
}

// Private helper to re-init the image component.
// Usage: reset.call(this) from inside a component method:
function reset() {
  const { width, height, lazyload, forceState } = this;

  // Default to not-loaded and treat img as "awake" when lazyload is disabled:
  if (!forceState) {
    this.lazing = lazyload;
    this.loading = this.loaded = this.fallback = false;
  }

  // Calculate aspectRatio after ensuring height/width won't cause accidental divide by zero error:
  this.aspectRatio =
    parseInt(width) && parseInt(height) && parseInt(height) / parseInt(width);
}
