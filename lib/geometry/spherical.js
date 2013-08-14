/*!
 * Geospatial - Geometry (Sperical) Utilities
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var assert = require('simple-assert');

/*!
 * Internal dependencies
 */

var LatLng = require('../constructors/latlng');

/*!
 * Constants
 */

var EARTH_RADIUS = 6378137;

/**
 * #### .geometry.spherical.computeDistanceBetween (a, b[, radius])
 *
 * Compute the difference between two `LatLng` coordinate sets using
 * the Haversine formula.
 *
 * The result uses the same distance scale as the input radius.
 * The default radius is that of Earth at `6378137 meters`.
 *
 * @param {LatLng} point a
 * @param {LatLng} point b
 * @param {Number} radius (optional)
 * @throw {AssertionError} for invalid input
 * @return {Number} result based on radius input scale
 */

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

/*!
 * Convert a value to radians.
 *
 * @param {Number} value
 * @return {Number} radian value
 */

function toRad (val) {
  return val * Math.PI / 180;
}
