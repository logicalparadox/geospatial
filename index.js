module.exports = process.env.geospatial_COV
  ? require('./lib-cov/geospatial')
  : require('./lib/geospatial');
