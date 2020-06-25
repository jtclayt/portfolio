/**
 * Author: Justin Clayton
 */

'use strict';
(function() {
  const PAGES = ['about', 'projects', 'contact'];
  const HEADERS = ['About Justin Clayton', 'My Projects', 'Contact Me']
  let currentPage = 0;
  let canScroll = true;
  $(document).ready(init);

  /** Initialize the JS to control page behavior */
  function init() {
    $('#projects').hide();
    $('#contact').hide();
    checkDesktopMode();
    $('#nav li').click(onPageNav);
    $(window).resize(checkDesktopMode);
  }

  /** Add event listener to scroll if in desktop mode */
  function checkDesktopMode() {
    if ($(window).innerWidth() >= 1024) {
      $(document).on('wheel', scrollPage);
    } else {
      $(document).off('wheel', scrollPage);
    }
  }

  /** Navigate to page clicked. */
  function onPageNav() {
    swapPage($(this).index());
  }

  /** Change the active 'page' */
  function scrollPage(event) {
    if (canScroll) {
      canScroll = false;
      setTimeout(() => {
        canScroll = true;
      }, 200);
      if (event.originalEvent.deltaY > 0) {
        swapPage((currentPage + 1) % PAGES.length);
      } else if (event.originalEvent.deltaY < 0) {
        swapPage((currentPage - 1 + PAGES.length) % PAGES.length);
      }
    }
  }

  /**
   * Swap active page to the one identified
   * @param {number} page - The page number to navigate to.
   */
  function swapPage(page) {
    $(`#${PAGES[currentPage]}`).slideUp();
    $('#nav li.selected').removeClass('selected');
    currentPage = page;
    $(`#${PAGES[currentPage]}`).slideDown();
    $($('#nav li').get(currentPage)).addClass('selected');
    $('header h1').text(HEADERS[currentPage]);
  }
})();