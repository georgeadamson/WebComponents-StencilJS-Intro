import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.scss'
})
export class DemoImg {
  @Prop() src: string = 'https://source.unsplash.com/random/400x400';
  @Prop() alt: string = '';

  @Prop({ mutable: true, reflectToAttr: true }) loading: boolean;

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
