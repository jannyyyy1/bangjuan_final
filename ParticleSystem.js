class ParticleSystem {
  constructor(origin) {
    this.origin = origin.copy();
    this.particles = [];
    this.baseOrigin = origin.copy(); //복원 위치
  }

  // 파티클 시스템 간의 밀고 당기는 힘
  applySystemInteraction(otherSystem) {
    // 다른 시스템과의 거리 계산
    let distance = p5.Vector.dist(this.origin, otherSystem.origin);
    if (distance > 0) {
      let forceDirection = p5.Vector.sub(otherSystem.origin, this.origin);
      let forceMagnitude = 100 / distance; // 거리로 감소하는 힘
      forceDirection.setMag(forceMagnitude);

      // 밀고 당기는 힘 적용 (당기기)
      this.origin.add(forceDirection);

      // 반대의 방향으로 밀어내기 힘도 적용
      forceDirection.mult(-1); // 반대 방향
      otherSystem.origin.add(forceDirection);
    }
  }

  // 입자에 힘을 적용
  applyForce(force) {
    this.origin.add(force);

    // 중심 복원력 적용
    let toBase = p5.Vector.sub(this.baseOrigin, this.origin).mult(0.05);
    this.origin.add(toBase);

    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  update() {
    // 새로운 입자 생성
    this.particles.push(new Particle(this.origin));
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  display() {
    for (let particle of this.particles) {
      particle.display();
    }
  }
}
