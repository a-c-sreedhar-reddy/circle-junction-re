(() => {
  // node_modules/rescript/lib/es6/js_int.js
  var max = 2147483647;
  var min = -2147483648;

  // node_modules/rescript/lib/es6/js_math.js
  function floor_int(f) {
    if (f > max) {
      return max;
    } else if (f < min) {
      return min;
    } else {
      return Math.floor(f);
    }
  }
  function random_int(min2, max2) {
    return floor_int(Math.random() * (max2 - min2 | 0)) + min2 | 0;
  }

  // node_modules/rescript/lib/es6/caml_option.js
  function some(x) {
    if (x === void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: 0
      };
    } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
      };
    } else {
      return x;
    }
  }
  function valFromOption(x) {
    if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
      return x;
    }
    var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
      };
    }
  }

  // node_modules/rescript/lib/es6/belt_Array.js
  function get(arr, i) {
    if (i >= 0 && i < arr.length) {
      return some(arr[i]);
    }
  }

  // node_modules/rescript/lib/es6/caml_int32.js
  function mod_(x, y) {
    if (y === 0) {
      throw {
        RE_EXN_ID: "Division_by_zero",
        Error: new Error()
      };
    }
    return x % y;
  }

  // node_modules/rescript/lib/es6/belt_Option.js
  function getExn(x) {
    if (x !== void 0) {
      return valFromOption(x);
    }
    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }

  // src/CircleJunction.bs.js
  var canvas = document.getElementById("my_canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var rect = canvas.getBoundingClientRect();
  var colors = [
    "30",
    "102",
    "174",
    "246",
    "318"
  ];
  var circles = [];
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#222";
  function next_color(c) {
    var num_colors = colors.length;
    var j = mod_(c.color + 1 | 0, num_colors);
    c.color = j;
  }
  function ev_mouse(ev) {
    var x = ev.clientX - rect.left | 0;
    var y = ev.clientY - rect.top | 0;
    for (var i = 0, i_finish = circles.length; i < i_finish; ++i) {
      var c = getExn(get(circles, i));
      var lx = x - c.x;
      var ly = y - c.y;
      if (lx * lx + ly * ly < c.r * c.r) {
        next_color(c);
      }
    }
  }
  function new_circle(param) {
    var _r = 16 + 16 * Math.random();
    var a = 360 * Math.random();
    var s = 0.2 + 0.8 * Math.random();
    var _colors_len = colors.length;
    var _dx = s * Math.cos(a * Math.PI / 180);
    var _dy = s * Math.sin(a * Math.PI / 180);
    var _color = random_int(0, _colors_len);
    return {
      r: _r,
      x: _r + (w - 2 * _r) * Math.random(),
      y: _r + (h - 2 * _r) * Math.random(),
      dx: _dx,
      dy: _dy,
      color: _color,
      collided: false
    };
  }
  function circles_collided(ca, cb) {
    ca.collided = true;
    cb.collided = true;
  }
  for (_for = 0; _for <= 17; ++_for) {
    _c = new_circle(void 0);
    circles.push(_c);
  }
  var _c;
  var _for;
  function circles_collide(ca, cb) {
    if (ca.color !== cb.color) {
      return false;
    }
    if (ca.collided || cb.collided) {
      return false;
    }
    var lx = ca.x - cb.x;
    var ly = ca.y - cb.y;
    var lim = ca.r + cb.r;
    return lx * lx + ly * ly < lim * lim;
  }
  function step_circle(c) {
    if (!c.collided) {
      c.x = c.x + c.dx;
      c.y = c.y + c.dy;
      if (c.x - c.r < 0 || c.x + c.r > w) {
        c.dx = -c.dx;
      }
      if (c.y - c.r < 0 || c.y + c.r > h) {
        c.dy = -c.dy;
        return;
      } else {
        return;
      }
    }
  }
  function draw_circle(c) {
    if (c.collided) {
      ctx.fillStyle = "#888";
    } else {
      var color = getExn(get(colors, c.color));
      ctx.fillStyle = "hsla(" + color + ", 80%, 60%, 0.6)";
    }
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }
  function sort_circles(ca, cb) {
    if (ca.collided && !cb.collided) {
      return -1;
    } else if (cb.collided && !ca.collided) {
      return 1;
    } else {
      return 0;
    }
  }
  function animate(param) {
    ctx.fillStyle = "#777";
    ctx.fillRect(0, 0, w, h);
    var circles_length2 = circles.length;
    for (var i = 0; i < circles_length2; ++i) {
      var _c = get(circles, i);
      var c = getExn(_c);
      step_circle(c);
      draw_circle(c);
    }
    for (var i$1 = 0, i_finish = circles_length2 - 2 | 0; i$1 <= i_finish; ++i$1) {
      var ci = getExn(get(circles, i$1));
      for (var j = i$1 + 1 | 0; j < circles_length2; ++j) {
        var cj = getExn(get(circles, j));
        if (circles_collide(ci, cj)) {
          circles_collided(ci, cj);
          circles.sort(sort_circles);
        }
      }
    }
  }
  function new_loc(c) {
    var _r = c.r;
    c.x = _r + (w - 2 * _r) * Math.random();
    c.y = _r + (h - 2 * _r) * Math.random();
  }
  var circles_length = circles.length;
  for (i = 0, i_finish = circles_length - 2 | 0; i <= i_finish; ++i) {
    ci = getExn(get(circles, i));
    for (j = i + 1 | 0; j < circles_length; ++j) {
      cj = getExn(get(circles, j));
      if (circles_collide(ci, cj)) {
        next_color(ci);
      }
    }
  }
  var ci;
  var cj;
  var j;
  var i;
  var i_finish;
  var loop = setInterval(animate, 25);
  canvas.addEventListener("mousedown", ev_mouse, false);
  var _w = w;
  var _h = h;
  var num_circles = 18;
})();
