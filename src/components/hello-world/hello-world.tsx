import { Component } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css'
})
export class AppRoot {
  render() {
    return <div>Hello world</div>;
  }
}
