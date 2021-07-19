const sketchContainer = document.querySelector('#sketchContainer');
const addButton = document.querySelector('.addButton');
const removeButton = document.querySelector('.removeButton');

addButton.addEventListener("click", () => createParticle());
removeButton.addEventListener("click", () => removeParticle());

let particleList = [];

function setup() {
  const width = sketchContainer.offsetWidth;
  const height = sketchContainer.offsetHeight; 
  const canvas = createCanvas(width, height);
  canvas.parent('sketchContainer');

  // pre-config
  frameRate(60);
  canvas.background(0, 0, 0);
  generate();
}

function draw() {
  background(0, 0, 0);

  push();
  for (let i = 0; i < particleList.length; i++) {
    particleList[i].getParticle();
    particleList[i].collide();

    for (let j = 0; j < particleList.length; j++) {
      if (i == j) {
        continue;
      }

      if (particleList[i].isIntersect(particleList[j])) {
        let particle_i_direction = {x_direction: particleList[i].x_sign, y_direction: particleList[i].y_sign};
        let particle_j_direction = {x_direction: particleList[j].x_sign, y_direction: particleList[j].y_sign};

        particleList[i].intersect(particle_j_direction);
        particleList[j].intersect(particle_i_direction);
      }
    }

    particleList[i].move();
  }
  pop();
}

function generate() {
  for (let i = 0; i < 5; i++) {
    let particle = new Particle(Math.floor(Math.random() * (width - 16)) + (16 / 2), Math.floor(Math.random() * (height - 16)) + (16 / 2), 16);

    particleList.push(particle);
  }
}

function createParticle() {
  let particle = new Particle(Math.floor(Math.random() * (width - 16)) + (16 / 2), Math.floor(Math.random() * (height - 16)) + (16 / 2), 16);

  particleList.push(particle);
}

function removeParticle() {
  particleList.pop();
}

class Particle {
  x;
  y;
  circleSize;
  x_sign = 1;
  y_sign = 1;
  radius;

  constructor(x, y, circleSize) {
    this.x = x;
    this.y = y;
    this.circleSize = circleSize;
    this.radius = circleSize / 2;
    fill(0, 0, 255);
    circle(this.x, this.y, this.circleSize);
  }

  getParticle() {
    fill(0, 0, 255);
    circle(this.x, this.y, this.circleSize);
  }

  isIntersect(otherParticle) {
    let distance = dist(this.x, this.y, otherParticle.x, otherParticle.y);

    if (distance < (2 * this.radius)) {
      return true;
    }

    return false;
  }

  intersect(otherParticleDirection) {
    if (this.x_sign === otherParticleDirection.x_direction) {
      this.y_sign = this.y_sign * -1;
      return;
    }

    if (this.y_sign === otherParticleDirection.y_direction) {
      this.x_sign = this.x_sign * -1;
      return;
    }

    this.x_sign = this.x_sign * -1;
    this.y_sign = this.y_sign * -1;
  }

  collide() {
    if ((this.x - (this.circleSize / 2)) <= 0 || (this.x + (this.circleSize / 2)) >= width) {
      this.x_sign = this.x_sign * -1;
    }
    if ((this.y - (this.circleSize / 2)) <= 0 || (this.y + (this.circleSize / 2)) >= height) {
      this.y_sign = this.y_sign * -1;
    }
  }

  move() {
    this.x = this.x + (1 * this.x_sign);
    this.y = this.y + (1 * this.y_sign);
  }
}