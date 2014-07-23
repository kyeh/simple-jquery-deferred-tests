$( function() {
  $('#cancel-link').on('click', submitCancel);
});

var submitCancel = function() {
  // note that this won't actually post to anything because this is just a demo
  return $.post('/echo/json/', {json:JSON.stringify({'status':"success"})})
    .done(function(data) { $('#cancel-status').text('cancel status: ' + data.status); })
    .fail(function(data) { $('#cancel-status').text('cancel did not return response'); });
};
