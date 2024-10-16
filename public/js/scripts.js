$(document).ready(function () {
    // Theme Switching
    const $themeSwitch = $('#theme-switch');
    const $themeIcon = $('#theme-icon');
    const $body = $('body');
  
    // Initialize theme based on user preference or default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  
    $themeSwitch.on('click', function () {
      const currentTheme = $body.hasClass('dark-mode') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  
    function setTheme(theme) {
      if (theme === 'dark') {
        $body.addClass('dark-mode').removeClass('light-mode');
        $themeIcon.removeClass('fa-sun').addClass('fa-moon');
      } else {
        $body.addClass('light-mode').removeClass('dark-mode');
        $themeIcon.removeClass('fa-moon').addClass('fa-sun');
      }
      localStorage.setItem('theme', theme);
    }
  
    // Profile Menu Toggle
    window.toggleProfileMenu = function () {
      $('#profile-dropdown').toggleClass('hidden');
    };
  
    // Shorten URL Functionality
    const $shortenBtn = $('#shorten-btn');
    const $longUrlInput = $('#long-url');
    const $shortUrlInput = $('#short-url');
  
    $shortenBtn.on('click', function () {
      <% if (!user) { %>
        window.location.href = '/login';
      <% } else { %>
        const longUrl = $longUrlInput.val().trim();
        if (longUrl === '') {
          alert('Please enter a URL.');
          return;
        }
        // Make an API call to shorten the URL
        $.ajax({
          url: '/api/shorten',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ longUrl }),
          success: function (data) {
            if (data.shortUrl) {
              $shortUrlInput.val(data.shortUrl).removeClass('hidden');
            } else {
              alert('Failed to shorten URL.');
            }
          },
          error: function () {
            alert('An error occurred.');
          }
        });
      <% } %>
    });
  
    // Delete Confirmation Modal
    let linkIdToDelete = null;
  
    window.confirmDelete = function (linkId) {
      linkIdToDelete = linkId;
      toggleModal();
    };
  
    function toggleModal() {
      $('#delete-modal').toggleClass('hidden');
    }
  
    const $confirmDeleteBtn = $('#confirm-delete');
    if ($confirmDeleteBtn.length) {
      $confirmDeleteBtn.on('click', function () {
        // Redirect to delete route
        window.location.href = `/links/delete/${linkIdToDelete}`;
      });
    }
  
    // Close modal when clicking outside the modal content
    $(window).on('click', function (event) {
      const $modal = $('#delete-modal');
      if ($(event.target).is($modal)) {
        toggleModal();
      }
    });
  });
  