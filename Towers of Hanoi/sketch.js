const DISK_HEIGHT = 30;
const DISK_WIDTH = 70;
let towers = [];
let button1, button2, button3;
var disk_container = null;
var error_message = null;
var moves = 0;
var NUM_DISKS;


function setup() {
  createCanvas(windowWidth, windowHeight);

  NUM_DISKS = 5;
  slider = createSlider(3,10,1);
  slider.position(20, 130);
  button4 = createButton('Start Game');
  button4.position(152, 130);
  button4.mousePressed(() => set_disks(towers[0], NUM_DISKS));

  towers[0] = new Tower(windowWidth/4, windowHeight/2 - 300/2, 300, NUM_DISKS);
  towers[1] = new Tower(windowWidth/2, windowHeight/2 - 300/2, 300, NUM_DISKS);
  towers[2] = new Tower((3 * windowWidth)/4, windowHeight/2 - 300/2, 300, NUM_DISKS);

  button1 = createButton('Push');
  button2 = createButton('Push');
  button3 = createButton('Push');
  button1.position(windowWidth/4 - button1.width/2, windowHeight/2 - 300/2 + 430);
  button2.position(windowWidth/2 - button2.width/2,  windowHeight/2 - 300/2 + 430);
  button3.position((3 * windowWidth)/4 - button3.width/2, windowHeight/2 - 300/2 + 430);
  button1.mousePressed(() => mouseHandling(towers[0]));
  button2.mousePressed(() => mouseHandling(towers[1]));
  button3.mousePressed(() => mouseHandling(towers[2]));
}

function draw() {
  background(0);

  winning_number = pow(2, NUM_DISKS) - 1; 

  NUM_DISKS = slider.value();
  textFont("Times New Romans");
  textSize(25);
  textAlign(LEFT, CENTER)
  fill(255);
  stroke(255);
  text("Number of Disks:", 20, 120);
  text(NUM_DISKS, 20, 150);
  text("Minimum Number of Moves to Win:", 20, 180);
  text(winning_number, 20, 210);
  if (moves != 0){
    text("Your Number of Moves:", 20, 240);
    text(moves-1, 20, 270);
  }

  if(towers[1].disks.length == NUM_DISKS || towers[2].disks.length == NUM_DISKS){
    winning_number = pow(2, NUM_DISKS) - 1;
    if(moves-1 == winning_number){
      fill("Blue");
      stroke("Blue");
      textSize(50);
      textAlign(CENTER, CENTER);
      text("You are Awesome!", windowWidth/2, 40);
    }
    else{
      fill("Blue");
      stroke("Blue");
      textSize(50);
      textAlign(CENTER, CENTER);
      var motivation = "Good Job! Try it in " + winning_number + " moves.";
      text(motivation, windowWidth/2, 40);
    }
  }

  if (moves != 0)
  {
    slider.hide();
    button4.hide();
  }
  
  
  if (moves == 0) {
    textFont('Times New Romans');
    textSize(30);
    textAlign(LEFT, CENTER)
    fill(255);
    text("How many disk do you want to stack?", 20, 20);
    
  }

  for(const tower of towers){
    tower.show();
  }

  if(disk_container != null){
    disk_container.show(windowWidth/2, 100, NUM_DISKS);
  }

  textFont('Times New Romans');
  textSize(30);
  textAlign(CENTER, CENTER);
  stroke("red");
  fill("red");
  if (error_message != null){
    len = error_message.length
    text(error_message, windowWidth/2, 20);
  }

}

class Tower{
  constructor(x,y,h,d){
    this.x = x;
    this.y = y;
    this.h = h;
    this.d = d;

    this.disks = [];
  }

  show(){
    strokeWeight(8);
    stroke(255);
    line(this.x, this.y, this.x, this.y + this.h)

    strokeWeight(1);
    for(let i = 0; i < this.disks.length; i++){
      const offset = -i * DISK_HEIGHT;
      const disk = this.disks[i];

      disk.show(this.x, this.y + this.h + offset, this.d);
    }
  }
}

function lg(n,b){
  return log(n) / log(b);
}

class Disk{
  constructor(size){
    this.size = size;
  }

  show(x,y,d){
    fill("red");
    stroke(0);

    const BASE = d/2;

    const w = DISK_WIDTH * lg(this.size + BASE, BASE);
    rect(x - w /2, y, w, DISK_HEIGHT)
  }
}

function mouseHandling(tower_number,){

  len = tower_number.disks.length

  if (disk_container == null){
    error_message = null;
    disk_container = tower_number.disks.pop();
  }else if (len == 0 || tower_number.disks[len -1].size > disk_container.size)
  {
    error_message = null;
    tower_number.disks.push(disk_container);
    disk_container = null;
    moves += 1;
  }else{
    error_message = "You cannot put a bigger disk on top of a smaller disk";
  }
}

function set_disks(place, numero){
  for(let i = numero; i -->0;){
    place.disks.push(new Disk(i));
    }
    moves +=1;
}

  
