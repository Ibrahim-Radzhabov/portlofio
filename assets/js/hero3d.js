(function () {
  'use strict';

  var stage = document.querySelector('[data-fracture-stage]');
  var canvas = document.querySelector('[data-fracture-canvas]');
  if (!stage || !canvas) return;
  var navLogo = document.querySelector('.nav-logo');
  var navMark = document.querySelector('.nav-logo-mark');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var compact = window.matchMedia('(max-width: 640px), (hover: none), (pointer: coarse)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || compact || !fine) return;

  var selected = 'task';
  var booted = false;

  window.__livingFractureApply = function (key) {
    selected = key || 'task';
  };

  function startScene() {
  if (booted) return;
  booted = true;

  var gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: true,
    depth: false,
    powerPreference: 'low-power',
    preserveDrawingBuffer: false
  });
  if (!gl) return;

  var vertexSource = [
    'attribute vec2 a_position;',
    'attribute vec4 a_color;',
    'attribute float a_size;',
    'varying vec4 v_color;',
    'void main() {',
    '  gl_Position = vec4(a_position, 0.0, 1.0);',
    '  gl_PointSize = a_size;',
    '  v_color = a_color;',
    '}'
  ].join('\n');

  var fragmentSource = [
    'precision mediump float;',
    'varying vec4 v_color;',
    'uniform float u_round;',
    'void main() {',
    '  if (u_round > 0.5) {',
    '    vec2 delta = gl_PointCoord - vec2(0.5);',
    '    if (dot(delta, delta) > 0.25) discard;',
    '  }',
    '  gl_FragColor = v_color;',
    '}'
  ].join('\n');

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  var vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
  var fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) return;

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  var buffer = gl.createBuffer();
  var positionLocation = gl.getAttribLocation(program, 'a_position');
  var colorLocation = gl.getAttribLocation(program, 'a_color');
  var sizeLocation = gl.getAttribLocation(program, 'a_size');
  var roundLocation = gl.getUniformLocation(program, 'u_round');

  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(colorLocation);
  gl.enableVertexAttribArray(sizeLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 28, 0);
  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 28, 8);
  gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 28, 24);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.disable(gl.DEPTH_TEST);

  var DPR = 1;
  var W = 0;
  var H = 0;
  var raf = 0;
  var lastFrame = performance.now();
  var slowFrames = 0;
  var targetRotX = 0;
  var targetRotY = 0;
  var rotX = 0;
  var rotY = 0;
  var dock = 0;
  var hoverKey = '';
  var stageDocCenter = { x: 0, y: 0 };
  var navCenter = { x: 0, y: 0 };
  var dockTargetScale = 0.18;

  var ink = [20 / 255, 18 / 255, 16 / 255, 1];
  var warm = [181 / 255, 98 / 255, 60 / 255, 1];
  var hot = [209 / 255, 116 / 255, 63 / 255, 1];

  var nodes = [
    { key: 'layout', x: -0.92, y: -1.18, z: 0.16, r: 17 },
    { key: 'raw', x: 0.92, y: 0, z: 0.42, r: 22 },
    { key: 'task', x: -0.92, y: 1.18, z: -0.12, r: 17 }
  ];

  nodes.forEach(function (node) {
    node.label = stage.querySelector('[data-fracture-label="' + node.key + '"]');
  });

  var particles = [];
  for (var i = 0; i < 8; i++) {
    particles.push({
      phase: (i / 8) * 2,
      speed: 0.0042 * (0.88 + Math.random() * 0.24),
      wobble: Math.random() * Math.PI * 2
    });
  }

  function clamp(value, min, max) {
    return value < min ? min : (value > max ? max : value);
  }

  function smooth(value) {
    var t = clamp(value, 0, 1);
    return t * t * (3 - 2 * t);
  }

  function mix(a, b, t) {
    return a + (b - a) * t;
  }

  function mixColor(a, b, t, alpha) {
    return [mix(a[0], b[0], t), mix(a[1], b[1], t), mix(a[2], b[2], t), alpha];
  }

  function resize() {
    stage.style.transform = '';
    var rect = stage.getBoundingClientRect();
    var navRect = navMark ? navMark.getBoundingClientRect() : null;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    stageDocCenter.x = (window.scrollX || window.pageXOffset || 0) + rect.left + rect.width / 2;
    stageDocCenter.y = (window.scrollY || window.pageYOffset || 0) + rect.top + rect.height / 2;
    if (navRect) {
      navCenter.x = navRect.left + navRect.width / 2;
      navCenter.y = navRect.top + navRect.height / 2;
      dockTargetScale = clamp((Math.max(navRect.width, navRect.height) * 2.15) / Math.max(1, Math.min(rect.width, rect.height)), 0.16, 0.24);
    }
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function project(node) {
    var base = Math.min(W, H) * 0.28;
    var x = node.x * base;
    var y = node.y * base;
    var z = node.z * base;
    var cy = Math.cos(rotY);
    var sy = Math.sin(rotY);
    var cx = Math.cos(rotX);
    var sx = Math.sin(rotX);
    var x1 = x * cy + z * sy;
    var z1 = z * cy - x * sy;
    var y1 = y * cx - z1 * sx;
    var z2 = z1 * cx + y * sx;
    var perspective = 1 + z2 / 820;
    var dockScale = 1 - dock * 0.72;

    return {
      x: W / 2 - W * 0.2 * dock + x1 * perspective * dockScale,
      y: H / 2 - H * 0.18 * dock + y1 * perspective * dockScale,
      s: perspective * dockScale
    };
  }

  function clipX(x) { return x / W * 2 - 1; }
  function clipY(y) { return 1 - y / H * 2; }

  function pushVertex(list, x, y, color, size) {
    list.push(clipX(x), clipY(y), color[0], color[1], color[2], color[3], (size || 1) * DPR);
  }

  function pushPoint(list, point, size, color) {
    pushVertex(list, point.x, point.y, color, size);
  }

  function pushLineQuad(list, a, b, width, color) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    var length = Math.max(1, Math.sqrt(dx * dx + dy * dy));
    var px = -dy / length * width * 0.5;
    var py = dx / length * width * 0.5;
    var points = [
      [a.x + px, a.y + py], [a.x - px, a.y - py], [b.x + px, b.y + py],
      [b.x + px, b.y + py], [a.x - px, a.y - py], [b.x - px, b.y - py]
    ];
    points.forEach(function (point) {
      pushVertex(list, point[0], point[1], color, 1);
    });
  }

  function drawBatch(vertices, mode, round) {
    if (!vertices.length) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
    gl.uniform1f(roundLocation, round ? 1 : 0);
    gl.drawArrays(mode, 0, vertices.length / 7);
  }

  function pointOnSegment(a, b, t) {
    return { x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), s: mix(a.s, b.s, t) };
  }

  function updateNodeDOMAndHitbox(node, point, alpha) {
    var isAI = node.key === 'raw';
    var isSelected = selected === node.key || selected === 'task';
    var isHover = hoverKey === node.key;
    var scale = isHover ? 1.16 : (isSelected ? 1.08 : 0.86);
    if (selected === node.key) scale = isAI ? 1.34 : 1.26;
    if (selected !== 'task' && selected !== node.key) scale = 0.76;
    var radius = node.r * point.s * scale;
    node.hit = { x: point.x, y: point.y, r: radius + 18 };

    if (node.label) {
      node.label.style.left = point.x + 'px';
      node.label.style.top = (point.y + radius + 18) + 'px';
      node.label.style.opacity = alpha.toFixed(3);
    }
    return radius;
  }

  function addNode(node, point, glowVertices, nodeVertices, alpha, radius) {
    var isAI = node.key === 'raw';
    var isHover = hoverKey === node.key;

    if (isAI || isHover) {
      pushPoint(glowVertices, point, radius * 3.9, isAI ? [warm[0], warm[1], warm[2], 0.12 * alpha] : [ink[0], ink[1], ink[2], 0.06 * alpha]);
    }
    pushPoint(nodeVertices, point, radius * 2, isAI ? [warm[0], warm[1], warm[2], alpha] : [ink[0], ink[1], ink[2], alpha]);
  }

  function fallback() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    stage.classList.remove('is-live');
    stage.style.transform = '';
    canvas.style.opacity = '';
    if (navLogo) navLogo.classList.remove('is-fracture-docked', 'is-fracture-undocked');
  }

  function render(now) {
    var dt = now - lastFrame;
    lastFrame = now;
    if (dt > 48) slowFrames += 1;
    else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 36) {
      fallback();
      return;
    }

    rotX += (targetRotX - rotX) * 0.065;
    rotY += (targetRotY - rotY) * 0.065;
    var alpha = 1 - clamp((dock - 0.35) / 0.48, 0, 1);
    var dockEase = smooth(dock);
    var scrollX = window.scrollX || window.pageXOffset || 0;
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var stageX = stageDocCenter.x - scrollX;
    var stageY = stageDocCenter.y - scrollY;
    var dockX = navMark ? (navCenter.x - stageX) * dockEase : -28 * dock;
    var dockY = navMark ? (navCenter.y - stageY) * dockEase : -34 * dock;
    var dockScale = mix(1, dockTargetScale, dockEase);
    canvas.style.opacity = alpha.toFixed(3);
    stage.style.transform = 'translate3d(' + dockX.toFixed(2) + 'px,' + dockY.toFixed(2) + 'px,0) scale(' + dockScale.toFixed(3) + ')';
    if (navLogo) {
      navLogo.classList.toggle('is-fracture-docked', dock > 0.42);
      navLogo.classList.toggle('is-fracture-undocked', dock <= 0.42);
    }

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var threeLive = stage.classList.contains('is-three-live');
    var proj = threeLive && window.__heroProjected;
    var p0 = proj ? proj.p0 : project(nodes[0]);
    var p1 = proj ? proj.p1 : project(nodes[1]);
    var p2 = proj ? proj.p2 : project(nodes[2]);
    var lines = [];
    var glows = [];
    var particleHalos = [];
    var particleCores = [];
    var nodeCores = [];
    pushLineQuad(lines, p0, p1, Math.max(3.5, 7 * Math.min(p0.s, p1.s)), [ink[0], ink[1], ink[2], 0.72 * alpha]);
    pushLineQuad(lines, p1, p2, Math.max(3.5, 7 * Math.min(p1.s, p2.s)), [ink[0], ink[1], ink[2], 0.72 * alpha]);

    particles.forEach(function (particle) {
      particle.phase += particle.speed * (dt / 16.67);
      if (particle.phase >= 2) particle.phase -= 2;
      var segment = particle.phase < 1 ? 0 : 1;
      var raw = particle.phase % 1;
      var start = segment === 0 ? p0 : p1;
      var end = segment === 0 ? p1 : p2;
      var point = pointOnSegment(start, end, smooth(raw));

      /* Wobble perpendicular to the segment direction (feels natural on any angle) */
      var segDx = end.x - start.x;
      var segDy = end.y - start.y;
      var segLen = Math.max(1, Math.sqrt(segDx * segDx + segDy * segDy));
      var perpX = -segDy / segLen;
      var perpY =  segDx / segLen;
      var wobbleAmt = Math.sin(now * 0.0018 + particle.wobble) * 6 * point.s;
      point.x += perpX * wobbleAmt;
      point.y += perpY * wobbleAmt;

      /* heat = 1 при mid, 0 на концах; квадрат — нелинейный нарастание */
      var near = segment === 0 ? raw : 1 - raw;
      var heat = near * near;

      /* radius: маленький вдали, заметно крупнее у центра */
      var radius = (3.2 + heat * 6.4) * point.s;

      /* halo: мягкое свечение, отчётливое у центра */
      pushPoint(particleHalos, point, radius * (4.4 + heat * 2.8),
        mixColor(warm, hot, heat, (0.12 + heat * 0.16) * alpha));

      /* core: полностью непрозрачный, цвет warm -> hot */
      pushPoint(particleCores, point, radius * 2.2,
        mixColor(warm, hot, heat, 0.92 * alpha));
    });

    var r0 = updateNodeDOMAndHitbox(nodes[0], p0, alpha);
    var r1 = updateNodeDOMAndHitbox(nodes[1], p1, alpha);
    var r2 = updateNodeDOMAndHitbox(nodes[2], p2, alpha);

    if (!threeLive) {
      addNode(nodes[0], p0, glows, nodeCores, alpha, r0);
      addNode(nodes[1], p1, glows, nodeCores, alpha, r1);
      addNode(nodes[2], p2, glows, nodeCores, alpha, r2);
      drawBatch(lines, gl.TRIANGLES, false);
      drawBatch(glows, gl.POINTS, true);
    }
    drawBatch(particleHalos, gl.POINTS, true);
    drawBatch(particleCores, gl.POINTS, true);
    if (!threeLive) {
      drawBatch(nodeCores, gl.POINTS, true);
    }
    raf = requestAnimationFrame(render);
  }

  function pointerToStage(event) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      nx: ((event.clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1,
      ny: ((event.clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1
    };
  }

  function detectHit(position) {
    for (var i = 0; i < nodes.length; i++) {
      var hit = nodes[i].hit;
      if (!hit) continue;
      var dx = position.x - hit.x;
      var dy = position.y - hit.y;
      if (Math.sqrt(dx * dx + dy * dy) <= hit.r) return nodes[i].key;
    }
    return '';
  }

  function onMove(event) {
    var position = pointerToStage(event);
    targetRotY = position.nx * 0.32;
    targetRotX = -position.ny * 0.22;
    hoverKey = detectHit(position);
    stage.classList.add('is-touched');
  }

  function onLeave() {
    targetRotX = 0;
    targetRotY = 0;
    hoverKey = '';
  }

  function onClick(event) {
    var key = detectHit(pointerToStage(event));
    if (key && typeof window.__heroScenarioSelect === 'function') window.__heroScenarioSelect(key);
  }

  function updateDock() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    dock = clamp(y / ((window.innerHeight || 800) * 0.72), 0, 1);
    if (navMark) {
      var navRect = navMark.getBoundingClientRect();
      navCenter.x = navRect.left + navRect.width / 2;
      navCenter.y = navRect.top + navRect.height / 2;
    }
    if (navLogo && !raf) {
      navLogo.classList.toggle('is-fracture-docked', dock > 0.42);
      navLogo.classList.toggle('is-fracture-undocked', dock <= 0.42);
    }
  }

  resize();
  updateDock();
  stage.classList.add('is-live');
  if (navLogo) navLogo.classList.add('is-fracture-undocked');
  stage.addEventListener('pointermove', onMove, { passive: true });
  stage.addEventListener('pointerleave', onLeave, { passive: true });
  stage.addEventListener('click', onClick);
  canvas.addEventListener('webglcontextlost', function (event) {
    event.preventDefault();
    fallback();
  });
  window.addEventListener('scroll', updateDock, { passive: true });
  window.addEventListener('resize', function () {
    resize();
    updateDock();
  }, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    } else if (!raf && stage.classList.contains('is-live')) {
      lastFrame = performance.now();
      raf = requestAnimationFrame(render);
    }
  });
  raf = requestAnimationFrame(render);
  }

  function scheduleSceneStart() {
    var timer = 0;
    function queue(delay) {
      if (booted) return;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        timer = 0;
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(startScene, { timeout: 900 });
        } else {
          startScene();
        }
      }, delay);
    }
    function startFromIntent() {
      queue(0);
    }

    window.addEventListener('pointerdown', startFromIntent, { passive: true, once: true });
    window.addEventListener('keydown', startFromIntent, { once: true });
    window.addEventListener('wheel', startFromIntent, { passive: true, once: true });
    window.addEventListener('scroll', startFromIntent, { passive: true, once: true });
    stage.addEventListener('pointerenter', startFromIntent, { passive: true, once: true });
  }

  scheduleSceneStart();
})();
