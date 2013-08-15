/*!
 * Geospatial - LatLng constructor
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var assert = require('simple-assert')
  , typeOf = require('type-detect');

/*!
 * Primary exports
 */

module.exports = LatLng;

/**
 * ### LatLng (lat, lng, wrap)
 *
 * Construct a Latitude/Longitude pair for use with
 * other utilities.
 *
 * The `wrap` argument determines whether to allow values
 * outside of the normal +/-90 latitude or +/-180 longitude
 * range. If not explicitly set to `false` numbers outside
 * this range will be set the closest bound.
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Boolean} wrap (default: _true_)
 * @throws AssertionError
 */

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

/**
 * ##### LatLng.from2d (point, wrap)
 *
 * Accessibility function for easily creating LatLng objects
 * from `2d` data points, such as an `[ x, y ]` array or
 * `{ lat: y, lng: x }` object (such as those stored in MongoDB).
 *
 * @param {Array|Object} coordinate
 * @param {Boolean} wrap (default: _true_)
 * @throws Error
 * @return {LatLng} constructed
 */

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

/**
 * #### .equal (latlng[, precision])
 *
 * Determine if current LatLng coordinate is equal to
 * another. If precision is provided all values will be rounded
 * to `precision` decimal points when compared. If precision is not
 * provided then comparison will be exact.
 *
 * @param {LatLng} secondary coordinates
 * @param {Number} precision decimal points (ignored if ommitted)
 * @throw {AssertionError} on bad input
 * @return {Boolean} result
 */

LatLng.prototype.equal = function (latlng, pts) {
  assert(latlng instanceof LatLng, 'LatLng#equals: expected instanceof LatLng.');

  if ('number' === typeOf(pts)) {
    if (this.lat().toFixed(pts) !== latlng.lat().toFixed(pts)) return false;
    if (this.lng().toFixed(pts) !== latlng.lng().toFixed(pts)) return false;
  } else {
    if (this.lat() !== latlng.lat()) return false;
    if (this.lng() !== latlng.lng()) return false;
  }

  return true;
};

/**
 * #### .lat ()
 *
 * Return the stored Latitude for this coordinate set.
 *
 * @return {Number} latitude
 */

LatLng.prototype.lat = function () {
  return this._lat;
};

/**
 * #### .lng ()
 *
 * Return the stored Longitude for this coordinate set.
 *
 * @return {Number} longitude
 */

LatLng.prototype.lng = function () {
  return this._lng;
};
