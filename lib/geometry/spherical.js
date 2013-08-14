var assert = require('simple-assert');

var LatLng = require('../constructors/latlng');

var EARTH_RADIUS = 6378137;

exports.computeDistanceBetween = function (a, b, radius) {
  assert(a instanceof LatLng, 'computeDistanceBetween: expected LatLng for first argument');
  assert(b instanceof LatLng, 'computeDistanceBetween: expected LatLng for first argument');
  var lat = toRad(b.lat() - a.lat());
  var lon = toRad(b.lon() - a.lon());
  var tmp = (1 - Math.cos(lat)) / 2;
  tmp += Math.cos(toRad(a.lat())) * Math.cos(toRad(b.lat()));
  tmp *= (1 - Math.cos(lon)) / 2;
  tmp = 2 * Math.atan2(Math.sqrt(tmp), Math.sqrt(1 - tmp));
  return arguments.length > 2 ? radius * tmp : EARTH_RADIUS * tmp;
};

function toRad (val) {
  return val * Math.PI / 180;
}
