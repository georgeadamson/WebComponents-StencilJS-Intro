import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.scss'
})
export class DemoImg {
  @Prop() src: string = 'https://source.unsplash.com/random/200x200';
  @Prop() alt: string;

  render() {
    let { src, alt } = this;

    if (typeof alt !== 'string') {
      src = null;
      alt = 'Missing alt YOU MUPPET! 🤦‍';
    } else if (!src) {
      src = null;
      alt = "Duh, give it some src! It ain't 🚀 science!";
    }

    return <img src={src} alt={alt} />;
  }
}
