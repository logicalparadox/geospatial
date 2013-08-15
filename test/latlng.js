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

    it('constructs with proper attributes', function () {

    });
  });

  describe('.lat()', function () {
    it('returns stored value', function () {
      var val = new geospatial.LatLng(10, 0);
      val.should.respondTo('lat');
      val.lat().should.equal(10);
    });
  });

  describe('.lng()', function () {
    it('returns stored value', function () {
      var val = new geospatial.LatLng(0, 10);
      val.should.respondTo('lng');
      val.lng().should.equal(10);
    });
  });

  describe('.equals(latlng)', function () {
    it('returns true for exact match', function () {
      var a = new geospatial.LatLng(10.1234, -10.1234)
        , b = new geospatial.LatLng(10.1234, -10.1234);
      a.equal(b).should.be.true;
      b.equal(a).should.be.true;
    });

    it('returns false for exact non-match', function () {
      var a = new geospatial.LatLng(10.1234, -10.1234)
        , b = new geospatial.LatLng(10.1235, -10.1235);
      a.equal(b).should.be.false;
      b.equal(a).should.be.false;
      a.equal(b, 3).should.be.true;
      b.equal(a, 3).should.be.true;
    });

    it('returns true for rounded match', function () {
      var a = new geospatial.LatLng(10.1234, -10.1234)
        , b = new geospatial.LatLng(10.1235, -10.1235);
      a.equal(b, 3).should.be.true;
      b.equal(a, 3).should.be.true;
    });

    it('returns false for rounded non-match', function () {
      var a = new geospatial.LatLng(10.1224, -10.1224)
        , b = new geospatial.LatLng(10.1235, -10.1235);
      a.equal(b, 3).should.be.false;
      b.equal(a, 3).should.be.false;
    });
  });
});
