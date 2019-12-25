$(document).ready(function() {
  console.log('Canvas Load Ok');
  var W = window.innerWidth,
    H = window.innerHeight,
    particleCount = 5,
    particles = [],
    minDist = 250,
    dist,
    bgColor = 'rgba(238,150,32,1)', // marsala of course
    dotColor = '#ee9620',
    xSpeed = 3,
    ySpeed = 3,
    dotSize = 10,
    side = 0,
    size = 50,
    x_axis = 100,
    y_axis = 100;

  // RequestAnimFrame for smooth animation
  window.requestAnimFrame = (function() {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  // canvas
  var canvas = document.getElementById('canvas');
  // context
  var ctx = canvas.getContext('2d');

  // width + height
  canvas.width = W;
  canvas.height = H;

  // paint canvas
  function paintCanvas() {
    // create pattern
    var my_gradient = ctx.createLinearGradient(0, 0, 0, 200);
    my_gradient.addColorStop(1, 'white');
    my_gradient.addColorStop(0.5, '#f7d706');
    my_gradient.addColorStop(0, '#ee9620');
    // ctx.fillStyle = bgColor;
    ctx.fillStyle = my_gradient;
    ctx.fillRect(0, 0, W, H);
  }

  // particle stuff
  function Particle() {
    // position
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    // speed
    this.vx = -1 + Math.random() * (Math.random() * xSpeed);
    this.vy = -1 + Math.random() * (Math.random() * ySpeed);
    // size
    // this.radius = Math.random() * (Math.random() * dotSize);

    // draw them
    this.draw = function() {
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.moveTo(x_axis + size * Math.cos(0), y_axis + size * Math.sin(0));
      /** Generate Dots */
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      for (let side=0; side < 7; side++) {
        ctx.lineTo(x_axis + size * Math.cos(side * 2 * Math.PI / 6), y_axis + size * Math.sin(side * 2 * Math.PI / 6));
      }
      ctx.closePath();
      // Fill the arc/hexagon we just made
      ctx.fill();
    };
  }

  // to array
  for (var i = 0; i < particleCount; i++) {
    particles.push(new Particle());    
  }

  console.log({particles});

  // draw the things
  function draw() {
    paintCanvas();

    // draw particles
    for (var i = 0; i < particles.length; i++) {
      p = particles[i];
      p.draw();
    }

    // update
    update();
  }

  // make 'em move
  function update() {
    for (var i = 0; i < particles.length; i++) {
      p = particles[i];

      // change velocities
      p.x += p.vx;
      p.y += p.vy;

      // change position if leaves canvas
      if (p.x + p.radius > W) p.x = p.radius;
      else if (p.x - p.radius < 0) {
        p.x = W - p.radius;
      }

      if (p.y + p.radius > H) p.y = p.radius;
      else if (p.y - p.radius < 0) {
        p.y = H - p.radius;
      }

      // make them attract
      // for (var j = i + 1; j < particles.length; j++) {
      //   p2 = particles[j];
      //   distance(p, p2);
      // }
    }
  }
  var mouse = {
    x: 0,
    y: 0
  };
  document.addEventListener(
    'mousemove',
    function(e) {
      mouse.x = e.clientX || e.pageX;
      mouse.y = e.clientY || e.pageY;
      // console.log(mouse.x, mouse.y);
    },
    false
  );

  // distance between dots
  function distance(p1, p2) {
    var dist,
      dx = p1.x - mouse.x;
    var dy = p1.y - mouse.y;
    dist = Math.sqrt(dx * dx + dy * dy);

    // draw line if distance is smaller than minimum distance
    if (dist <= minDist) {
      // draw line
      // ctx.beginPath();
      // ctx.strokeStyle =
      //   'rgba(255,219,0,' + (1.2 - dist / minDist / Math.random()) + ')';
      // ctx.lineWidth = 3;
      // ctx.moveTo(mouse.x, mouse.y);
      // ctx.lineTo(p1.x, p1.y);
      // ctx.stroke();
      // ctx.closePath();

      // acceleration depending on distance
      var ax = dy / 5000000,
        ay = dy / 5000000;

      // apply acceleration
      p1.vx -= ax;
      p1.vy -= ay;
    }
  }

  // start main animation loop
  function animloop() {
    draw();
    requestAnimFrame(animloop);
  }
  animloop();
});
