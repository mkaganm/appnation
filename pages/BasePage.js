/**
 * BasePage - Base class for all page objects
 * Contains common methods used across all pages
 */
class BasePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url - The URL to navigate to
   * @param {object} options - Navigation options
   */
  async navigateTo(url, options = { waitUntil: 'domcontentloaded', timeout: 60000 }) {
    console.log(`Navigating to ${url}...`);
    await this.page.goto(url, options);
    console.log('✅ Page loaded successfully!');
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector - CSS selector or XPath
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click on an element
   * @param {string} selector - CSS selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Type text into an input field
   * @param {string} selector - CSS selector
   * @param {string} text - Text to type
   * @param {object} options - Typing options
   */
  async type(selector, text, options = { delay: 100 }) {
    await this.page.type(selector, text, options);
  }

  /**
   * Press a keyboard key
   * @param {string} key - Key name (e.g., 'Enter', 'Escape')
   */
  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  /**
   * Wait for a specified amount of time
   * @param {number} ms - Milliseconds to wait
   */
  async wait(ms) {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Get element by selector
   * @param {string} selector - CSS selector
   * @returns {Promise<ElementHandle>}
   */
  async getElement(selector) {
    return await this.page.$(selector);
  }

  /**
   * Check if element exists
   * @param {string} selector - CSS selector
   * @returns {Promise<boolean>}
   */
  async isElementVisible(selector) {
    const element = await this.page.$(selector);
    return element !== null;
  }

  /**
   * Get text content of an element
   * @param {string} selector - CSS selector
   * @returns {Promise<string>}
   */
  async getTextContent(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Take a screenshot
   * @param {string} path - Path to save screenshot
   */
  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
    console.log(`📸 Screenshot saved to ${path}`);
  }
}

module.exports = BasePage;
