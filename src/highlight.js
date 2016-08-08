export class Highlight {
    
  highlight(highlight) {
    if(highlight){
        this.element.style.color = 'white';
        this.element.style.backgroundColor = '#55BFE0';
    } else {
        this.element.style.color = '';
        this.element.style.backgroundColor = '';
    }
  }
}