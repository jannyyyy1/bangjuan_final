class ParticleSystem {
    constructor(origin) {
        this.origin = origin.copy();
        this.particles = [];
        this.baseOrigin = origin.copy(); //복원 위치
    }

    applyForce(force) {
        // 중심에 힘 적용
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