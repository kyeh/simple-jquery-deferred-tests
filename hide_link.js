$( function() {
  $('#hide-link').on('click', hideLink);
});

hideStatus = '';

function hideLink() {
  debugger
  if (hideStatus !== 'in-progress') {
    debugger
    hideStatus = 'in-progress';  
    updateStatus(hideStatus);
    $('#hide-link').hide( 2000 ).promise()
    .done(function() { 
        hideStatus = 'finished';
        updateStatus(hideStatus);
    });
  }
};

function updateStatus(status) {
    $('#hide-status').text('Link hiding ' + status);
};
