var img = null;
var imgRed = null;
var imgGreen = null;
var imgBlue = null;
var imgGrey = null;
var imgRbow = null;
var imgBlur = null;
var imgWin = null;
var imgReset = null;

var file = document.getElementById("file");
var canvas = null;

function load() {
  img = new SimpleImage(file);
  imgRed = new SimpleImage(file);
  imgBlue = new SimpleImage(file);
  imgGreen = new SimpleImage(file);
  imgRbow = new SimpleImage(file);
  imgBlur = new SimpleImage(file);
  imgReset = new SimpleImage(file);
  imgGrey = new SimpleImage(file);
  imgWin = new SimpleImage(file);
  canvas = document.getElementById("can");
  img.drawTo(canvas);
}

function filter(pixel, color) {
  var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
  if (avg < 128) {
    pixel.setRed((color[0] / 127.5) * avg);
    pixel.setGreen((color[1] / 127.5) * avg);
    pixel.setBlue((color[2] / 127.5) * avg);
  } else {
    pixel.setRed((2 - color[0] / 127.5) * avg + 2 * color[0] - 255);
    pixel.setGreen((2 - color[1] / 127.5) * avg + 2 * color[1] - 255);
    pixel.setBlue((2 - color[2] / 127.5) * avg + 2 * color[2] - 255);
  }
}

function red() {
  for (var pixel of imgRed.values()) {
    filter(pixel, [255, 0, 0]);
  }
  canvas = document.getElementById("can");
  imgRed.drawTo(canvas);
}

function green() {
  for (var pixel of imgGreen.values()) {
    filter(pixel, [0, 255, 0]);
  }
  canvas = document.getElementById("can");
  imgGreen.drawTo(canvas);
  return;
}

function blue() {
  for (var pixel of imgBlue.values()) {
    filter(pixel, [0, 0, 255]);
  }
  canvas = document.getElementById("can");
  imgBlue.drawTo(canvas);
}

function rainbow() {
  var height = imgRbow.getHeight();
  for (var pixel of imgRbow.values()) {
    var y = pixel.getY();
    if (y < height / 7) {
      filter(pixel, [255, 0, 0]);
    } else if (y < (2 * height) / 7) {
      filter(pixel, [255, 127, 0]);
    } else if (y < (3 * height) / 7) {
      filter(pixel, [255, 255, 0]);
    } else if (y < (4 * height) / 7) {
      filter(pixel, [0, 255, 0]);
    } else if (y < (5 * height) / 7) {
      filter(pixel, [0, 0, 255]);
    } else if (y < (6 * height) / 7) {
      filter(pixel, [75, 0, 130]);
    } else {
      filter(pixel, [148, 0, 211]);
    }
  }
  canvas = document.getElementById("can");
  imgRbow.drawTo(canvas);
}

function grey() {
  for (var pixel of imgGrey.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
  var canvas = document.getElementById("can");
  imgGrey.drawTo(canvas);
}

function getnewPixel(x, y) {
  var h = imgBlur.getHeight();
  var w = imgBlur.getWidth();
  var newX = x + Math.round(Math.random() * 10) - 5;
  var newY = y + Math.round(Math.random() * 10) - 5;

  if (newX > w - 1) {
    newX = w - 1;
  } else if (newX < 0) {
    newX = 0;
  }

  if (newY > h - 1) {
    newY = h - 1;
  } else if (newY < 0) {
    newY = 0;
  }

  return (imgBlur.getPixel(newX, newY));
}

function blurImage() {
  for (var pixel of imgBlur.values()) {
    var random = Math.random();
    var x = pixel.getX();
    var y = pixel.getY();
    if (random < 0.5) {
      imgBlur.setPixel(x, y, pixel);
    } else {
      var newPixel = getnewPixel(x, y);
      imgBlur.setPixel(x, y, newPixel);
    }
  }
  var canvas = document.getElementById("can");
  imgBlur.drawTo(canvas);
}

function setBorder(pixel) {
  var pixelBorder = pixel.setRed(225);
  pixelBorder = pixel.setGreen(255);
  pixelBorder = pixel.setBlue(0);
  return pixelBorder;
}

function windowFilter() {
  var w = imgWin.getWidth();
  var h = imgWin.getHeight();
  var th = w * 0.0125;
  var xx = (w - 4 * th) / 3;
  var yy = (h - 3 * th) / 2;
  for (var pixel of imgWin.values()) {
    if (pixel.getY() < th || pixel.getY() >= h - th) {
      setBorder(pixel);
    }
    if (pixel.getX() < th || pixel.getX() >= w - th) {
      setBorder(pixel);
    }
    if (pixel.getX() > xx && pixel.getX() < xx + th) {
      setBorder(pixel);
    }
    if (pixel.getX() > 2 * xx + th && pixel.getX() < 2 * xx + 2 * th) {
      setBorder(pixel);
    }
    if (pixel.getY() > yy && pixel.getY() < yy + th) {
      setBorder(pixel);
    }
  }
  imgWin.drawTo(canvas);
}

function clearImage() {
  var imgTemp = document.getElementById("can");
  var clearImg = imgTemp.getContext("2d");
  clearImg.clearRect(0, 0, imgTemp.width, imgTemp.height);
  return;
}

function resetImage() {
  load();
}
