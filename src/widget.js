import {inject, Lazy} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);
const JSON_URL = 'http://localhost:3000/widgets/';

@inject(Lazy.of(HttpClient))
export class Widget {
  heading = 'Widgets';
  widgets = [];
  widget = {
      name: '',
      price: null
  };

  constructor(getHttpClient) {
    this.getHttpClient = getHttpClient;
  }

  async activate() {
      this.fetchWidgets()
    }

  async fetchWidgets() {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(JSON_URL);
    });

    const response = await http.fetch('');
    this.widgets = await response.json();
  }

  async saveWidget() {

    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(JSON_URL)
        .withDefaults({
            headers: {
                'Accept': 'application/json'
            }
        })
    });

    http.fetch('', {
        method: 'post',
        body: json(this.widget)
    })
    .then(response => response.json())
    .then(savedWidget => {
    console.log(`Saved widget: ${savedWidget.name}`);
    // this.widgets.push(savedWidget);
    this.fetchWidgets();
    this.resetWidget();
  });
  }

  resetWidget() {
      this.widget = {
        name: '',
        price: null
      };
  }

  async deleteWidget(selectedWidget) {
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(JSON_URL)
        .withDefaults({
            headers: {
                'Accept': 'application/json'
            }
        })
    });

    http.fetch(selectedWidget.id, {
        method: 'delete',
        body: json(selectedWidget)
    })
    .then(response => response.json())
    .then(() => {
    // this.widgets.splice(this.widgets.indexOf(selectedWidget), 1);
    console.log(`Deleted widget: ${selectedWidget.name}`);
    this.fetchWidgets();
  });
  }

  selectWidget(selectedWidget) {
      this.widget = selectedWidget;
  }
}
