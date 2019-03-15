import { Component, Prop, State, Watch, Method } from '@stencil/core';

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

  @State() loaded: boolean;

  componentDidLoad() {
    this.loading = true;
  }

  onLoad = () => {
    this.loaded = true;
    this.loading = false;
  };

  render() {
    const { src, alt, loaded, onLoad } = this;
    const className = loaded ? 'loaded' : 'loading';

    return <img src={src} alt={alt} class={className} onLoad={onLoad} />;
  }
}
