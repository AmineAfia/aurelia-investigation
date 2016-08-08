import {inject, Lazy} from 'aurelia-framework';
import {CssAnimator} from 'aurelia-animator-css';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
const CLIENT_ID = '1c4e873b00a11267af83';
const SECRET_ID= '05e808c776cf80692506c30ef3479b687966fde4';
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@inject(Lazy.of(HttpClient), CssAnimator, Element)
export class Git {
  heading = 'Github Users';
  gitUser = {};
  user= '';

  constructor(getHttpClient, animator, element) {
    this.getHttpClient = getHttpClient;
    this.animator = animator;
    this.element = element;
  }

  async fetchUsers() {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();
    
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(`https://api.github.com/users/${this.user}?client_id=${CLIENT_ID}&client_secret=${SECRET_ID}`);
    });

    const response = await http.fetch('gitUser');
    this.gitUser = await response.json();
  }

  flipCard() {
        var list = this.element.querySelector('.au-flip-container');
        this.animator.animate(list, 'background-animation');
  }
}
