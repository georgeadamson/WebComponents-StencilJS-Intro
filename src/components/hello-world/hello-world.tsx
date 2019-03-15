import {
  Component,
  Prop,
  State,
  Watch,
  Method,
  Event,
  EventEmitter
} from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.scss'
})
export class DemoImg {
  @Prop({ mutable: true }) src: string =
    'https://source.unsplash.com/random/400x400';

  @Prop() alt: string = '';

  @Prop({ mutable: true, reflectToAttr: true }) loading: boolean;

  // WARNING! This does not fire when component loads :(
  // Try: document.getElementsByTagName('hello-world')[0].alt = null
  @Watch('alt')
  validateAlt(newValue: string /*, oldValue: string */) {
    if (newValue === null || newValue === 'null') {
      throw new Error(`hello-world alt cannot be ${newValue}`);
    }
  }

  // document.getElementsByTagName('hello-world')[0].whatIsAlt()
  @Method()
  whatIsAlt() {
    console.log(this.alt);
  }

  // See: https://stenciljs.com/docs/events
  @Event() helloWorld: EventEmitter;

  @State() loaded: boolean;

  // See: https://stenciljs.com/docs/component-lifecycle
  componentDidLoad() {
    this.loading = true;
  }

  onLoad = () => {
    this.loaded = true;
    this.loading = false;
    this.helloWorld.emit({ yay: 'The event worked!' });
  };

  render() {
    const { src, alt, loaded, onLoad } = this;
    const className = loaded ? 'loaded' : 'loading';

    return <img src={src} alt={alt} class={className} onLoad={onLoad} />;
  }
}
