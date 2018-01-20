
$(document).ready(function() {
  $.ajax({
    url: "/api/username",
    success: function(result) {
      $('.userName').text(result.user.email);
    }
  });
});

