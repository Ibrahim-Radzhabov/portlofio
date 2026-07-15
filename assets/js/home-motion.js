import * as THREE from './vendor/three.module.js?v=0.160.0';

(function () {
  'use strict';

  var motionGate = window.matchMedia('(min-width: 969px) and (pointer: fine)');
  var reduceGate = window.matchMedia('(prefers-reduced-motion: no-preference)');
  if (!motionGate.matches || !reduceGate.matches || !document.body.classList.contains('pl-done')) return;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  function debounce(fn, wait) {
    var timer = 0;
    return function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(fn, wait);
    };
  }

  function initLenis() {
    if (!window.Lenis) return null;
    var lenis = new window.Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.82
    });
    lenis.on('scroll', function () {
      ScrollTrigger.update();
    });
    function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    }
    window.requestAnimationFrame(raf);
    return lenis;
  }

  function initProgress() {
    var progress = document.querySelector('[data-motion-progress]');
    if (!progress) return;
    var ticking = false;
    function update() {
      ticking = false;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      var value = Math.min(1, Math.max(0, window.scrollY / max));
      progress.style.transform = 'scaleX(' + value + ')';
    }
    function request() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    update();
  }

  function initPipeline() {
    var anchors = ['.hero', '#work', '#services', '#order-demo', '#request-journey', '#process', '#contact']
      .map(function (selector) { return document.querySelector(selector); })
      .filter(Boolean);
    if (anchors.length < 3) return;

    var layer = document.createElement('div');
    layer.className = 'motion-pipeline';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<svg><path class="motion-pipeline-path" data-motion-pipeline-path></path></svg><div class="motion-pipeline-pulse" data-motion-pipeline-pulse></div>';
    document.body.prepend(layer);

    var path = layer.querySelector('[data-motion-pipeline-path]');
    var pulse = layer.querySelector('[data-motion-pipeline-pulse]');
    var nodes = [];
    var length = 0;
    var pulseRaf = 0;
    var trigger = null;
    var workFilterRaf = 0;

    function pointFor(el, index) {
      var rect = el.getBoundingClientRect();
      var docTop = window.scrollY + rect.top;
      var narrow = window.innerWidth < 1200;
      var xPattern = narrow ? [0.28, 0.66, 0.34, 0.68, 0.32, 0.62, 0.5] : [0.18, 0.78, 0.26, 0.72, 0.22, 0.68, 0.52];
      return {
        x: Math.round(window.innerWidth * (xPattern[index] || 0.5)),
        y: Math.round(docTop + Math.min(rect.height * 0.32, 230))
      };
    }

    function buildPath(points) {
      var d = 'M ' + points[0].x + ' ' + points[0].y;
      for (var i = 1; i < points.length; i += 1) {
        var prev = points[i - 1];
        var next = points[i];
        var midY = prev.y + (next.y - prev.y) * 0.52;
        d += ' C ' + prev.x + ' ' + midY + ', ' + next.x + ' ' + midY + ', ' + next.x + ' ' + next.y;
      }
      return d;
    }

    function clearNodes() {
      nodes.forEach(function (node) { node.remove(); });
      nodes = [];
    }

    function rebuild() {
      clearNodes();
      var docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      layer.style.height = docHeight + 'px';
      var points = anchors.map(pointFor);
      path.setAttribute('d', buildPath(points));
      length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      points.forEach(function (point, index) {
        var node = document.createElement('span');
        node.className = 'motion-pipeline-node' + (anchors[index].id === 'services' ? ' is-core' : '');
        node.style.left = point.x + 'px';
        node.style.top = point.y + 'px';
        layer.appendChild(node);
        nodes.push(node);
      });
      if (trigger) trigger.kill();
      trigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: function (self) {
          path.style.strokeDashoffset = length * (1 - self.progress);
        }
      });
      ScrollTrigger.refresh();
    }

    function animatePulse(time) {
      if (length) {
        var progress = (time % 6000) / 6000;
        var point = path.getPointAtLength(length * progress);
        pulse.style.transform = 'translate3d(' + point.x + 'px,' + point.y + 'px,0) translate(-50%, -50%)';
      }
      pulseRaf = window.requestAnimationFrame(animatePulse);
    }

    rebuild();
    animatePulse(0);
    window.addEventListener('resize', debounce(rebuild, 180), { passive: true });
    document.addEventListener('work-filter-change', function () {
      if (workFilterRaf) return;
      workFilterRaf = window.requestAnimationFrame(function () {
        var scrollY = window.scrollY;
        workFilterRaf = 0;
        rebuild();
        if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
        ScrollTrigger.update();
      });
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden && pulseRaf) {
        window.cancelAnimationFrame(pulseRaf);
        pulseRaf = 0;
      } else if (!document.hidden && !pulseRaf) {
        animatePulse(performance.now());
      }
    });
  }

  function initOrderDemo() {
    var demo = document.querySelector('[data-order-demo]');
    if (!demo) return;
    var play = demo.querySelector('[data-order-demo-play]');
    var stage = demo.querySelector('[data-order-demo-stage]');
    var path = demo.querySelector('[data-order-demo-path]');
    var packet = demo.querySelector('[data-order-demo-packet]');
    var scenes = Array.from(demo.querySelectorAll('[data-order-demo-scene]'));
    if (!play || !stage || !path || !packet || !scenes.length) return;

    var length = 0;
    var timeline = null;

    function measure() {
      length = path.getTotalLength();
    }

    function setPacket(progress) {
      var point = path.getPointAtLength(length * progress);
      var svgBox = path.ownerSVGElement.getBoundingClientRect();
      var stageBox = stage.getBoundingClientRect();
      var x = svgBox.left - stageBox.left + point.x / 760 * svgBox.width;
      var y = svgBox.top - stageBox.top + point.y / 190 * svgBox.height;
      packet.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%, -50%)';
    }

    function playDemo() {
      measure();
      if (timeline) timeline.kill();
      gsap.set(scenes, { autoAlpha: 0.32, y: 0, scale: 0.98 });
      gsap.set(scenes[0], { autoAlpha: 1, scale: 1 });
      setPacket(0);
      timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
      scenes.forEach(function (scene, index) {
        var progress = index / (scenes.length - 1);
        timeline.to({}, {
          duration: index ? 0.55 : 0.1,
          onUpdate: function () {
            var prev = index ? (index - 1) / (scenes.length - 1) : 0;
            var local = this.progress();
            setPacket(prev + (progress - prev) * local);
          }
        });
        timeline.to(scenes, { autoAlpha: 0.32, scale: 0.98, duration: 0.22 }, '<');
        timeline.to(scene, { autoAlpha: 1, scale: 1, duration: 0.28 }, '<');
      });
      play.textContent = 'Повторить путь заказа';
    }

    measure();
    gsap.set(scenes, { autoAlpha: 0.72 });
    gsap.set(scenes[0], { autoAlpha: 1 });
    setPacket(0);
    play.addEventListener('click', playDemo);
    window.addEventListener('resize', debounce(function () {
      measure();
      setPacket(0);
    }, 140), { passive: true });
  }

  function initMagneticCtas() {
    var targets = Array.from(document.querySelectorAll('.hero .btn-primary, #contact .btn-primary'));
    targets.forEach(function (target) {
      target.addEventListener('mousemove', function (event) {
        var rect = target.getBoundingClientRect();
        var x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        var y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
        target.style.transform = 'translate3d(' + Math.max(-6, Math.min(6, x)) + 'px,' + Math.max(-6, Math.min(6, y)) + 'px,0)';
      });
      target.addEventListener('mouseleave', function () {
        target.style.transform = '';
      });
    });
  }

  function initFaviconNotification() {
    var favicon = document.querySelector('link[rel="icon"][sizes="32x32"], link[rel="icon"][type="image/png"]');
    if (!favicon) return;
    var original = favicon.getAttribute('href');
    var marked = '/favicon-32-dot.png';
    document.addEventListener('visibilitychange', function () {
      favicon.setAttribute('href', document.hidden ? marked : original);
    });
  }

  function initThreeMark() {
    var stage = document.querySelector('[data-fracture-stage]');
    var canvas = document.querySelector('[data-motion-three-canvas]');
    if (!stage || !canvas || !THREE || !window.WebGLRenderingContext) return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (err) {
      return;
    }

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.3);
    var group = new THREE.Group();
    scene.add(group);

    var ink = new THREE.MeshBasicMaterial({ color: 0x141210 });
    var core = new THREE.MeshBasicMaterial({ color: 0xB5623C });
    var linkMat = new THREE.MeshBasicMaterial({ color: 0x141210 });
    var particleMat = new THREE.MeshBasicMaterial({ color: 0xB5623C });
    var sphereGeo = new THREE.SphereGeometry(0.32, 32, 24);
    var coreGeo = new THREE.SphereGeometry(0.40, 32, 24);
    var particleGeo = new THREE.SphereGeometry(0.06, 12, 10);

    var top = new THREE.Mesh(sphereGeo, ink);
    var mid = new THREE.Mesh(coreGeo, core);
    var bottom = new THREE.Mesh(sphereGeo, ink);
    top.position.set(-1.3, 2, 0.2);
    mid.position.set(1.3, 0, 0);
    bottom.position.set(-1.3, -2, -0.2);

    function cylinderBetween(a, b) {
      var dir = new THREE.Vector3().subVectors(b.position, a.position);
      var len = dir.length();
      var geo = new THREE.CylinderGeometry(0.045, 0.045, 1, 16, 1, true);
      var mesh = new THREE.Mesh(geo, linkMat);
      mesh.scale.y = len;
      orientCylinder(mesh, a, b);
      return mesh;
    }

    function orientCylinder(mesh, a, b) {
      var dir = new THREE.Vector3().subVectors(b.position, a.position);
      var len = Math.max(0.001, dir.length());
      mesh.position.copy(a.position).add(b.position).multiplyScalar(0.5);
      mesh.scale.y = len;
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    }

    var linkTop = cylinderBetween(top, mid);
    var linkBottom = cylinderBetween(mid, bottom);
    group.add(linkTop, linkBottom, top, mid, bottom);

    var segments = [[top.position, mid.position], [mid.position, bottom.position]];
    var particles = [];
    for (var particleIndex = 0; particleIndex < 8; particleIndex += 1) {
      var particle = new THREE.Mesh(particleGeo, particleMat);
      particle.userData.progress = (particleIndex / 8) * 2;
      particle.userData.speed = 0.005 + Math.random() * 0.002;
      group.add(particle);
      particles.push(particle);
    }

    var visible = true;
    var alive = true;
    var frames = 0;
    var frameSum = 0;
    var lastTime = performance.now();
    var targetRotX = 0;
    var targetRotY = 0;
    var sceneNodes = { layout: top, raw: mid, task: bottom };

    Object.keys(sceneNodes).forEach(function (key) {
      var node = sceneNodes[key];
      node.userData.baseZ = node.position.z;
      node.userData.targetZ = node.position.z;
      node.userData.targetScale = 1;
    });

    function selectNode(key) {
      Object.keys(sceneNodes).forEach(function (nodeKey) {
        var node = sceneNodes[nodeKey];
        var active = nodeKey === key;
        node.userData.targetScale = active ? 1.5 : 1;
        node.userData.targetZ = node.userData.baseZ + (active ? 0.8 : 0);
      });
    }

    window.__phase8ThreeSelectNode = selectNode;
    document.addEventListener('hero-scenario-change', function (event) {
      selectNode(event.detail && event.detail.key ? event.detail.key : 'task');
    });

    var initialScenario = document.querySelector('.hero-scenario.is-active');
    selectNode(initialScenario ? initialScenario.getAttribute('data-scenario') : 'task');

    function resize() {
      var rect = stage.getBoundingClientRect();
      var dpr = Math.min(1.5, window.devicePixelRatio || 1);
      renderer.setPixelRatio(dpr);
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(1, rect.height);
      camera.updateProjectionMatrix();
    }

    function destroy() {
      alive = false;
      stage.classList.remove('is-three-live');
      renderer.dispose();
      group.traverse(function (obj) {
        if (obj.geometry) obj.geometry.dispose();
      });
    }

    /* Shared projection for hero3d.js particle sync */
    var _projV = new THREE.Vector3();
    function screenOf(mesh) {
      mesh.getWorldPosition(_projV);
      _projV.project(camera);
      var w = canvas.clientWidth, h = canvas.clientHeight;
      return { x: (_projV.x + 1) / 2 * w, y: (1 - _projV.y) / 2 * h, s: 1 };
    }

    function render(now) {
      if (!alive) return;
      var dt = Math.max(1, now - lastTime);
      lastTime = now;
      if (visible && !document.hidden) {
        Object.keys(sceneNodes).forEach(function (key) {
          var node = sceneNodes[key];
          var scale = node.scale.x + (node.userData.targetScale - node.scale.x) * 0.08;
          node.scale.setScalar(scale);
          node.position.z += (node.userData.targetZ - node.position.z) * 0.08;
        });
        orientCylinder(linkTop, top, mid);
        orientCylinder(linkBottom, mid, bottom);

        particles.forEach(function (particle) {
          particle.userData.progress += particle.userData.speed * (dt / 16.67);
          if (particle.userData.progress >= 2) particle.userData.progress -= 2;
          var segmentIndex = particle.userData.progress < 1 ? 0 : 1;
          var rawProgress = particle.userData.progress % 1;
          var smoothProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
          particle.position.lerpVectors(segments[segmentIndex][0], segments[segmentIndex][1], smoothProgress);
          var nearCore = segmentIndex === 0 ? rawProgress : 1 - rawProgress;
          particle.scale.setScalar(1 + nearCore * nearCore * 0.6);
        });

        group.rotation.y += ((targetRotY + Math.sin(now * 0.0003) * 0.08) - group.rotation.y) * 0.08;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.08;
        renderer.render(scene, camera);
        /* Keep the lightweight hit layer and labels aligned with the Three scene. */
        window.__heroProjected = {
          p0: screenOf(top),
          p1: screenOf(mid),
          p2: screenOf(bottom)
        };
        if (frames < 120) {
          frames += 1;
          frameSum += 1000 / dt;
          if (frames === 120 && frameSum / frames < 45) destroy();
        }
      }
      window.requestAnimationFrame(render);
    }

    window.addEventListener('mousemove', function (event) {
      var x = event.clientX / window.innerWidth - 0.5;
      var y = event.clientY / window.innerHeight - 0.5;
      targetRotY = x * 0.34;
      targetRotX = -y * 0.24;
    }, { passive: true });

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: function (self) {
        canvas.style.opacity = String(1 - self.progress * 1.2);
      }
    });

    var io = new IntersectionObserver(function (entries) {
      visible = entries.some(function (entry) { return entry.isIntersecting; });
    }, { threshold: 0.05 });
    io.observe(stage);

    resize();
    stage.classList.add('is-three-live');
    window.addEventListener('resize', debounce(resize, 120), { passive: true });
    window.requestAnimationFrame(render);
  }

  initLenis();
  initProgress();
  initPipeline();
  initOrderDemo();
  initMagneticCtas();
  initFaviconNotification();
  initThreeMark();
})();
