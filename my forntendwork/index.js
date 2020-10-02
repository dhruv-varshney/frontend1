var img = null;
var imgRed = null;
var imgGreen = null;
var imgBlue = null;
var imgGrey = null;
var imgRbow = null;
var imgReset = null;
var file = document.getElementById("file");
var canvas = null;

function load() {
  img = new SimpleImage(file);
  imgRed = new SimpleImage(file);
  imgBlue = new SimpleImage(file);
  imgGreen = new SimpleImage(file);
  imgRbow = new SimpleImage(file);
  imgReset = new SimpleImage(file);
  imgGrey = new SimpleImage(file);
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
function resetImage() {
  load();
}
