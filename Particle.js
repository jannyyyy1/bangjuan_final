// A simple Particle class

class Particle {
    constructor(position) {
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D().mult(random(0.5, 2));
        this.position = position.copy();
        this.lifespan = 255;
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2;
        this.acceleration.mult(0);
    }

    display() {
        noStroke();
        fill(150, this.lifespan);
        ellipse(this.position.x, this.position.y, 4);
      }

    isDead() {
        return this.lifespan < 0;
    }
}

