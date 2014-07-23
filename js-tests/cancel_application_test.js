module("Test AJAX post using deferred object", {
  setup: function() {
    var $fixture = $('#qunit-fixture');

    $fixture.append('<span id="cancel-status"></span>');
  }
});

test("Mocking the post call", function() { 
  var deferred = $.Deferred();
  this.mock($).expects('post')
    .withArgs('/echo/json/', {json:JSON.stringify({'status':"success"})})
    .once()
    .returns(deferred);

  submitCancel();
  QUnit.equal($('#cancel-status').text(), '');
});

test("Using the deferred to trigger done for done status", function() { 
  var deferred = $.Deferred();
  this.mock($).expects('post')
    .withArgs('/echo/json/', {json:JSON.stringify({'status':"success"})})
    .once()
    .returns(deferred);

  submitCancel();
  QUnit.equal($('#cancel-status').text(), '');

  deferred.resolve({status: "success"});
  QUnit.equal($('#cancel-status').text(), 'cancel status: success');
});

test("Using the deferred to trigger done for not-found status", function() { 
  var deferred = $.Deferred();
  this.mock($).expects('post')
    .withArgs('/echo/json/', {json:JSON.stringify({'status':"success"})})
    .once()
    .returns(deferred);

  submitCancel();
  QUnit.equal($('#cancel-status').text(), '');

  deferred.resolve({status: "not-found"});
  QUnit.equal($('#cancel-status').text(), 'cancel status: not-found');
});

test("Using the deferred to trigger fail", function() { 
  var deferred = $.Deferred();
  this.mock($).expects('post')
    .withArgs('/echo/json/', {json:JSON.stringify({'status':"success"})})
    .once()
    .returns(deferred);

  submitCancel();
  QUnit.equal($('#cancel-status').text(), '');

  deferred.reject();
  QUnit.equal($('#cancel-status').text(), 'cancel did not return response');
});