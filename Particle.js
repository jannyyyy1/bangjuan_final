class Particle {
    constructor(position) {
      this.position = position.copy();
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      this.lifespan = 255; // 입자의 수명 (투명해지는 정도)
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0); // 가속도 초기화
  
      this.lifespan -= 2; // 수명 감소
    }
  
    isDead() {
      return this.lifespan < 0; // 수명이 다했으면 true
    }
  
    display() {
      fill(255, this.lifespan);
      noStroke();
      ellipse(this.position.x, this.position.y, 5, 5); // 작은 원으로 입자 표시
    }
  }
  