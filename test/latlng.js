describe('LatLng', function () {
  describe('construction', function () {
    it('fails when wrong arguments provided', function () {
      (function () {
        var latlng = new geospatial.LatLng();
      }).should.throw('Latitude: expected a number.');
      (function () {
        var latlng = new geospatial.LatLng('a');
      }).should.throw('Latitude: expected a number.');
      (function () {
        var latlng = new geospatial.LatLng(0);
      }).should.throw('Longitude: expected a number.');
      (function () {
        var latlng = new geospatial.LatLng(0, 'a');
      }).should.throw('Longitude: expected a number.');
    });
  });
});
