describe('geometry.spherical', function () {
  describe('.computeDistanceBetween()', function () {
    it('returns expected value', function () {
      var a = new geospatial.LatLng(37.77896, -122.51450)
        , b = new geospatial.LatLng(37.78693, -122.38637)
        , dist = geospatial.geometry.spherical.computeDistanceBetween(a, b);
      Math.round(dist).should.equal(11273);
    });
  });
});
