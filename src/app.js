export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: 'welcome',       name: 'welcome',       moduleId: './welcome',     nav: true, title: 'Welcome' },
      { route: ['', 'git'],     name: 'git',           moduleId: './git',         nav: true, title: 'Github' },
      { route: 'widget',        name: 'widget',        moduleId: './widget',      nav: true, title: 'Widget' },
      { route: 'about',         name: 'about',         moduleId: './about',       nav: true, title: 'About' }
    ]);
    
    this.router = router;
  }
}
