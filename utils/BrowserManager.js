const { chromium } = require('playwright');

/**
 * BrowserManager - Handles browser initialization and configuration
 */
class BrowserManager {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }

  /**
   * Launch browser with specified configuration
   * @param {object} options - Browser launch options
   */
  async launchBrowser(options = {}) {
    const defaultOptions = {
      headless: false,
      channel: 'chrome',
      slowMo: 0, // Add delay between operations if needed
      ...options
    };

    console.log('Opening Chrome browser...');
    this.browser = await chromium.launch(defaultOptions);
    return this.browser;
  }

  /**
   * Create a new browser context
   * @param {object} options - Context options
   */
  async createContext(options = {}) {
    if (!this.browser) {
      await this.launchBrowser();
    }

    const defaultOptions = {
      viewport: { width: 1280, height: 720 },
      ...options
    };

    this.context = await this.browser.newContext(defaultOptions);
    return this.context;
  }

  /**
   * Create a new page
   */
  async createPage() {
    if (!this.context) {
      await this.createContext();
    }

    this.page = await this.context.newPage();
    return this.page;
  }

  /**
   * Initialize browser, context and page (all-in-one)
   * @param {object} browserOptions - Browser launch options
   * @param {object} contextOptions - Context options
   */
  async initialize(browserOptions = {}, contextOptions = {}) {
    await this.launchBrowser(browserOptions);
    await this.createContext(contextOptions);
    await this.createPage();
    return this.page;
  }

  /**
   * Close the browser
   */
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close();
      console.log('🔴 Browser closed');
    }
  }

  /**
   * Close the page
   */
  async closePage() {
    if (this.page) {
      await this.page.close();
      console.log('📄 Page closed');
    }
  }

  /**
   * Close the context
   */
  async closeContext() {
    if (this.context) {
      await this.context.close();
      console.log('🔒 Context closed');
    }
  }

  /**
   * Get current page
   */
  getPage() {
    return this.page;
  }

  /**
   * Get current context
   */
  getContext() {
    return this.context;
  }

  /**
   * Get current browser
   */
  getBrowser() {
    return this.browser;
  }

  /**
   * Keep browser open indefinitely
   */
  async keepAlive() {
    console.log('⏸️  Browser will stay open - press Ctrl+C in terminal to close');
    await new Promise(() => {}); // Infinite promise
  }
}

module.exports = BrowserManager;
