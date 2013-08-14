
var assert = require('simple-assert')
  , typeOf = require('type-detect');

module.exports = LatLng;

function LatLng (lat, lng, wrap) {
  assert('number' === typeOf(lat), 'Latitude: expected a number.');
  assert('number' === typeOf(lng), 'Longitude: expected a number.');

  if (false === wrap) {
    this._lat = lat;
    this._lng = lng;
  } else {
    this._lat = lat > 90 ? 90 : lat < -90 ? -90 : lat;
    this._lng = lng > 180 ? 180 : lng < -180 ? -180 : lng;
  }
}

LatLng.from2d = function (point, wrap) {
  var res = {};

  if ('array' === typeOf(point)) {
    res.lng = point[0];
    res.lat = point[1];
  } else if ('object' === typeOf(point)) {
    res.lng = 'number' === typeOf(point.lng) ? point.lng : point.x;
    res.lat = 'number' === typeOf(point.lat) ? point.lat : point.y;
  } else {
    throw new Error('Unable to normalize point of type "' + typeOf(point) + '".');
  }

  return new LatLng(res.lat, res.lng, wrap);
};

LatLng.prototype.equal = function (latlng, pts) {
  assert(latlng instanceof LatLng, 'LatLng#equals: expected instanceof LatLng.');

  if ('number' !== typeOf(pts)) {
    if (this.lat().toFixed(pts) !== latlng.lat().toFixed(pts)) return false;
    if (this.lng().toFixed(pts) !== latlng.lng().toFixed(pts)) return false;
  } else {
    if (this.lat() !== latlng.lat()) return false;
    if (this.lng() !== latlng.lng()) return false;
  }

  return true;
};

LatLng.prototype.lat = function () {
  return this._lat;
};

LatLng.prototype.lng = function () {
  return this._lng;
};
