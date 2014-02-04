'use strict';


var cache = require('..')(),
pkg = require('../package.json'),
should = require('should'),
_ = require('underscore');

// sort of stupid tests, but they are my most basic and initial tests to get testing up and going

describe('versioning', function(){
  it('should have a version', function(){
    cache.should.have.property('version').and.be.a.String;
  });

  it('should equal package version', function(){
    cache.version.should.be.exactly(pkg.version);
  });
});

var interfaces = ['info','clear','put','has','get','remove'];

describe('published interface has', function(){
  _.each(interfaces, function(fxn){
    it(fxn + '()', function(){
      cache[fxn].should.be.a.Function;
    });
  });
});

describe('failback', function(){

  _.each(interfaces, function(fxn){
    describe(fxn + '()', function(){

      it('should callback error if callback', function(done){
	cache[fxn](function(err){
	  err.should.be.a.Error;
	  return done();
	});
      });
      it('should throw error if no callback', function(){
	var error = false;
	try{ cache[fxn](); }catch(err){ error = err; }
	error.should.be.a.Error;
      });
    });
  });
});
