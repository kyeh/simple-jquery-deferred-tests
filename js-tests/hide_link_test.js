module("Test text confirmation after hide() using deferred object", {
  setup: function() {
    var $fixture = $('#qunit-fixture');

    $fixture.append('\
      <a href="#" id="hide-link">Click me to hide</a>\
      <span id="hide-status"></span>\
    ');
    hideStatus = '';
  }
});

test("This test fails because assertion executes before hide finishes", function(){
  hideLink();
  QUnit.equal($('#hide-status').text(), 'Link hiding finished');
});

test("In-progress message visible once deferred is resolved", function(){
  var deferred = $.Deferred();
  this.mock($.prototype).expects('hide')
    .withArgs(2000)
    .once()
    .returns(deferred);

  hideLink();
  QUnit.equal($('#hide-status').text(), 'Link hiding in-progress');
});

test("Finished message visible once deferred is resolved", function(){
  var deferred = $.Deferred();
  this.mock($.prototype).expects('hide')
    .withArgs(2000)
    .once()
    .returns(deferred);

  hideLink();
  deferred.resolve();
  QUnit.equal($('#hide-status').text(), 'Link hiding finished');
});

test("Hide called only once if triggered multiple times", function(){
  var deferred = $.Deferred();
  this.mock($.prototype).expects('hide')
    .withArgs(2000)
    .once() // this once assertion will verify hide was called only once during the test
    .returns(deferred);

  hideLink();
  QUnit.equal($('#hide-status').text(), 'Link hiding in-progress');
  hideLink(); //runs the second time after .hide() was called
  deferred.resolve();
});
