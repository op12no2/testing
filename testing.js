
var version = '1.1';

// globals

var gx      = 480;                    // canvas width
var gy      = 480;                    // canvas height
var gt      = gx * gy;

var gColPN  = "#1b4f72";
var gColPP  = "#216a8c";
var gColNP  = "#216a8c";
var gColNN  = "#1b4f72";

var gPercentPos = 0.0;
var gPercentNeg = 0.0;
var gSpec       = 0.0;
var gSens       = 0.0;

var gPosTestPos = 0;
var gPosTestNeg = 0;
var gNegTestPos = 0;
var gNegTestNeg = 0;

function redraw() {

  gPercentPos = parseInt($('#posslider').val()) / 100.0;
  gPercentNeg = 1.0 - gPercentPos;
  gSens       = parseInt($('#sensslider').val()) / 1000.0;
  gSpec       = parseInt($('#specslider').val()) / 1000.0;

  var x = 0;
  var y = 0;
  var w = 0;
  var h = 0;

  gPosTestPos = gt * gPercentPos * gSens;
  gPosTestNeg = gt * gPercentPos * (1 - gSens);

  gNegTestNeg = gt * gPercentNeg * gSpec;
  gNegTestPos = gt * gPercentNeg * (1 - gSpec);

  x = 0;
  y = 0;
  w = gx * gPercentPos;
  h = gy * gPosTestPos / (gPosTestPos + gPosTestNeg);
  ctx.fillStyle = gColPP;
  ctx.fillRect(x,y,w,h);

  ctx.fillStyle = '#eeeeee';
  ctx.font      = "10px Serif";
  ctx.fillText('TP', x+w/2-5, y+h/2)

  x = x;
  y = h;
  w = w;
  h = gy * gPosTestNeg / (gPosTestPos + gPosTestNeg);
  ctx.fillStyle = gColPN;
  ctx.fillRect(x,y,w,h);

  if (gSens < 0.999) {
    ctx.fillStyle = '#eeeeee';
    ctx.font      = "10px Serif";
    ctx.fillText('FN', x+w/2-5, y+h/2)
  }

  x = gx * gPercentPos;
  y = 0;
  w = gx * gPercentNeg;
  h = gy * gNegTestNeg / (gNegTestPos + gNegTestNeg);
  ctx.fillStyle = gColNN;
  ctx.fillRect(x,y,w,h);

  ctx.fillStyle = '#eeeeee';
  ctx.font      = "10px Serif";
  ctx.fillText('TN', x+w/2-5, y+h/2)

  x = x;
  y = h;
  w = w;
  h = gy * gNegTestPos / (gNegTestPos + gNegTestNeg);
  ctx.fillStyle = gColNP;
  ctx.fillRect(x,y,w,h);

  if (gSpec < 0.999) {
    ctx.fillStyle = '#eeeeee';
    ctx.font      = "10px Serif";
    ctx.fillText('FP', x+w/2-5, y+h/2)
  }

  x = x-1;
  y = 0;
  w = 3;
  h = gy;
  ctx.fillStyle = '#eeeeee';
  ctx.fillRect(x,y,w,h);

  $('#postext').html(gPercentPos*100 + '% background rate');
  $('#senstext').html(Math.round(gSens*1000.0)/10.0 + '% sensitivity');
  $('#spectext').html(Math.round(gSpec*1000.0)/10.0 + '% specificity');

  var probpos = Math.round(gPosTestPos / (gPosTestPos + gNegTestPos)*100);
  var probneg = Math.round(gNegTestNeg / (gNegTestNeg + gPosTestNeg)*100);

  $('#head2').html('Positive result: '+probpos+'%');
  $('#head3').html('Negative result: '+probneg+'%');
}

var canvas = 0;
var ctx    = 0;

$(function() {

  $('#ver').html(version);

  canvas = document.getElementById("graphs");
  ctx    = canvas.getContext("2d");

  $('#posslider').on('input', function (e) {
    redraw();
  });
  $('#sensslider').on('input', function (e) {
    redraw();
  });
  $('#specslider').on('input', function (e) {
    redraw();
  });

  redraw();

});



