import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'hello-world',
  styleUrl: 'hello-world.css'
})
export class AppRoot {
  @Prop() label: string = 'My attr default';

  render() {
    return <div>Hello world {this.label}</div>;
  }
}
