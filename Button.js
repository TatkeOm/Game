class StateChange{
  constructor(){
    this.title = createElement('h1');
    this.playButton = createButton('PLAY');
    this.infoButton = createButton('INFO');
    this.backstory = createElement('h3')
  }

  display(){
    this.title.position(windowWidth/2-250,windowHeight/2 - 300);
    this.title.html("TURTLE ESCAPE");
    this.title.class("gameTitle");
    this.playButton.position(windowWidth/2-300,windowHeight/2-50);
    this.playButton.class("customButton");
    this.infoButton.position(windowWidth/2+200,windowHeight/2-50);
    this.infoButton.class("customButton");
    this.infoButton.mousePressed(()=>{
      this.showInfo()
    })
    this.playButton.mousePressed(()=>{
      gameState="play";
      this.playButton.hide();
      this.infoButton.hide();
      this.backstory.hide();
      this.title.hide();
    })
  }

  showInfo(){
    var message = `The turtle has been captured by ghosts. Use the arrow keys to move and escape. \n
    Eat kale to move to the next level. Now the turtle has to escape sharks and ghosts. \n
    Eat fish to escape and win the game!`
    this.backstory.html(message)
    this.backstory.class("leadersText");
    this.backstory.position(windowWidth/2-800, windowHeight/2);
  }
}