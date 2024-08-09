$(document).ready(function () {
  const $body = $('body');
  const $header = $('.header');
  const $buttons = $('button');
  const $themeToggle = $('#theme-toggle');

  // Check for saved theme in localStorage
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    $body.addClass('light-mode');
    $header.addClass('light-mode');
    $buttons.addClass('light-mode');
    $themeToggle.prop('checked', true);
  } else {
    // Default to dark mode
    localStorage.setItem('theme', 'dark');
    $themeToggle.prop('checked', false);
  }

  $themeToggle.on('change', function () {
    const isLightMode = $themeToggle.is(':checked');
    $body.toggleClass('light-mode', isLightMode);
    $header.toggleClass('light-mode', isLightMode);
    $buttons.toggleClass('light-mode', isLightMode);

    // Save theme preference
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  });

  // Modal functionality
  const $loginModal = $('#login-modal');
  const $signupModal = $('#signup-modal');
  const $loginClose = $('#login-close');
  const $signupClose = $('#signup-close');

  $('button').click(function () {
    if ($(this).text() === 'Login') {
      $loginModal.show();
    } else if ($(this).text() === 'Sign Up') {
      $signupModal.show();
    }
  });

  const clearFormData = () => {
    $('#signup-username').val('');
    $('#signup-password').val('');
    $('#login-username').val('');
    $('#login-password').val('');
    $('#login-error').text('');
    $('#signup-error').text('');
  };

  $loginClose.click(function () {
    clearFormData();
    $loginModal.hide();
  });

  $signupClose.click(function () {
    clearFormData();
    $signupModal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is('.modal')) {
      clearFormData();
      $loginModal.hide();
      $signupModal.hide();
    }
  });

  // Handle form submissions (dummy error handling for demonstration)
  $('#login-form').submit(function (event) {
    event.preventDefault();

    const username = $('#login-username').val();
    const password = $('#login-password').val();

    $.ajax({
      url: '/login',
      type: 'POST',
      data: { username, password },
      success: function (response) {
        if (response.redirect) {
          window.location.href = response.redirect;
        } else {
          $('#login-error').text(response.message);
        }
      },
    });
  });

  $('#signup-form').submit(function (event) {
    event.preventDefault();

    const username = $('#signup-username').val();
    const password = $('#signup-password').val();

    $.ajax({
      url: '/signup',
      type: 'POST',
      data: { username, password },
      success: function (response) {
        if (response.redirect) {
          window.location.href = response.redirect;
        } else {
          $('#signup-error').text(response.message);
        }
      },
    });
  });

  // Toggle password visibility
  $('#toggle-login-password').change(function () {
    const $passwordField = $('#login-password');
    const type = $(this).is(':checked') ? 'text' : 'password';
    $passwordField.attr('type', type);
  });

  $('#toggle-signup-password').change(function () {
    const $passwordField = $('#signup-password');
    const type = $(this).is(':checked') ? 'text' : 'password';
    $passwordField.attr('type', type);
  });
});
