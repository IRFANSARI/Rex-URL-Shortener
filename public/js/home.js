$(document).ready(function () {
  $('#shorten').on('click', function (e) {
    e.preventDefault();
    const longURL = $('#long-url').val();

    const schemes = [
      'http://',
      'https://',
      'ftp://',
      'ftps://',
      'mailto:',
      'file://',
    ];

    // Check if the URL starts with any of the defined schemes
    const startsWithScheme = schemes.some((scheme) =>
      longURL.startsWith(scheme)
    );

    if (!startsWithScheme) {
      showToast('Invalid URL !!!');
      return;
    }

    $.ajax({
      url: '/home',
      type: 'POST',
      data: { url: longURL },
      success: function (response) {
        if (response.redirect) {
          window.location.href = response.redirect;
        } else {
          $('#short-url').val(response.message);
        }
      },
    });
  });

  $('#copy-btn').on('click', function () {
    const shortUrl = $('#short-url');
    shortUrl.select();
    document.execCommand('copy');
    showToast('Copied on Clipboard');
  });

  function showToast(message) {
    const toaster = $('#toaster');
    toaster.text(message);
    toaster.fadeIn(400).delay(1000).fadeOut(400);
  }
});
