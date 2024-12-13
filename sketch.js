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