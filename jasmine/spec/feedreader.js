/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* Ensures that the allFeeds variable has been 
     * defined and that it is not empty. 
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Loops through each feed in the allFeeds object and 
     * ensures it has a URL defined and that the URL is not empty.
     */
    it('should define a URL for each feed in the allFeeds object', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe("");
        expect(allFeeds[i].url).not.toBeNull();
      }
    });

    /* Loops through each feed in the allFeeds object and ensures 
     * it has a name defined and that the name is not empty.
     */
    it('should define a name for each feed in the allFeeds object', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe("");
        expect(allFeeds[i].name).not.toBeNull();
      }
    });
  });

  /* This test suite tests the functionality of the menu featured
   * throughout the application
   */
  describe('Menu feature', function() {
    /* Ensures the menu element is hidden by default. Analyzes the
     *  HTML and the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('should initially be hidden by default', function() {
      expect($("body").hasClass('menu-hidden')).toBe(true);
    });

    /* Ensures the menu changes visibility when the menu icon is clicked. 
     * This test should have two expectations: 
     * does the menu display when clicked
     * and does it hide when clicked again.
     */
    it('should toggle showing and closing upon clicking the menu icon', function() {
      // Initial click - check class disappeared and transform position is correct
      $(".menu-icon-link").click();
      expect($("body").hasClass('menu-hidden')).toBe(false);

      // Second click - check class shows and transform position is correct
      $(".menu-icon-link").click();
      expect($("body").hasClass('menu-hidden')).toBe(true);
    });
  });

  /* This test suite tests the functionality of the Initial Entries */
  describe('Initial Entries', function() {
    // support for AJAX request
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* Ensures when the loadFeed function is called and completes its work, 
     * there is at least a single .entry element within the .feed container.
     */
    it('should contain at least one .entry element within the .feed container', function() {
      expect($('.entry').length).toBeGreaterThan(0);
    });
  });

  /* This test suite tests the functionality of the New Feed Selection */
  describe('News Feed', function() {
    var feed1, feed2;
    // support for AJAX request
    beforeEach(function(done) {
      // Load first feed
      loadFeed(0, function() {
        feed1 = $('.feed').html();
        // Load second feed
        loadFeed(1, function() {
          feed2 = $('.feed').html();
          done();
        });
      });
    });

    /* Ensures when a news feed is loaded by the loadFeed function that the 
     * content actually changes.
     */
    it('should load a new feed and the content changes', function() {
      expect(feed1).not.toEqual(feed2);
    });
  });
}());