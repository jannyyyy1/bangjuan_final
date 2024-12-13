// Aircraft 클래스 정의
class Aircraft {
    constructor() {
      this.position = createVector(width / 2, height - 50);
      this.target = createVector(width / 2, height - 50);
      this.target = null;
      this.speed = 5;
      this.forceRadius = 150; // 힘의 범위
      this.forceMagnitude = 100; // 힘의 크기
    }
  
    setTarget(target) {
      this.target = target.copy();
    }


  generateForce(targetOrigin) {
    // 비행기가 파티클 시스템 중심에 미치는 힘
    let distance = p5.Vector.dist(this.position, targetOrigin);
    if (distance < this.forceRadius) {
      let force = p5.Vector.sub(targetOrigin, this.position);
      force.setMag(-this.forceMagnitude / (distance + 1)); // 거리 감소 효과
      return force;
    }
    return createVector(0, 0);
  }
  
     update() {
     if (this.target) {
      let direction = p5.Vector.sub(this.target, this.position);
      if (direction.mag() < this.speed) {
        this.position = this.target.copy();
        this.target = null;
      } else {
        direction.setMag(this.speed);
        this.position.add(direction);
      }
    }
  }
  
    display() {
      fill(255, 0, 0);
      noStroke();
      triangle(
        this.position.x, this.position.y - 10,
        this.position.x - 10, this.position.y + 10,
        this.position.x + 10, this.position.y + 10
      );

          // Target 표시
    if (this.target) {
        stroke(200, 50, 50, 150);
        line(this.position.x, this.position.y, this.target.x, this.target.y);
      }
    }
  }
  
  