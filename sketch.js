let particleSystems = [];
let aircraft;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 4; i++) {
    // 태풍 파티클 시스템 초기화
    let x = random(200, width - 200);
    let y = random(200, height - 200);
    particleSystems.push(new ParticleSystem(createVector(x, y)));
  }

  aircraft = new Aircraft();
}

function draw() {
  background(51);

  aircraft.update();
  aircraft.display();

  // 파티클 시스템 간의 밀고 당기는 힘 적용
  for (let i = 0; i < particleSystems.length; i++) {
    for (let j = i + 1; j < particleSystems.length; j++) {
      // 각 파티클 시스템끼리 밀고 당기는 힘 적용
      particleSystems[i].applySystemInteraction(particleSystems[j]);
    }
  }

  // 각 파티클 시스템의 힘 적용 및 업데이트
  for (let ps of particleSystems) {
    ps.applyForce(aircraft.generateForce(ps.origin)); // 비행기 힘 적용
    ps.update();
    ps.display();
  }
}

function mousePressed() {
  // 마우스 클릭 시 비행기 이동
  aircraft.setTarget(createVector(mouseX, mouseY));
}