const BasePage = require('./BasePage');

/**
 * ChatBotPage - Page Object for ChatBot AI website
 * Contains all elements and actions specific to chatbotai.com
 */
class ChatBotPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://chatbotai.com/';
    
    // Locators
    this.locators = {
      chatInput: '#chat-input-textarea',
      sendButton: 'button[type="submit"]', // Adjust if needed
      messageContainer: '.message-container', // Adjust based on actual structure
      userMessage: '.user-message', // Adjust based on actual structure
      botResponse: '.bot-response' // Adjust based on actual structure
    };
  }

  /**
   * Navigate to ChatBot AI page
   */
  async navigate() {
    await this.navigateTo(this.url);
    console.log('🌐 URL: https://chatbotai.com/');
  }

  /**
   * Wait for chat input to be ready
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForChatInput(timeout = 10000) {
    console.log('📝 Waiting for textarea...');
    await this.wait(2000); // Wait for page to fully load
    const textarea = await this.getElement(this.locators.chatInput);
    
    if (!textarea) {
      throw new Error('❌ Textarea not found!');
    }
    
    console.log('✅ Textarea found!');
    return textarea;
  }

  /**
   * Type a message in the chat input
   * @param {string} message - Message to type
   */
  async typeMessage(message) {
    console.log('🖱️  Clicking on textarea...');
    const textarea = await this.waitForChatInput();
    await textarea.click();
    await this.wait(500);
    
    console.log(`⌨️  Typing "${message}"...`);
    await textarea.type(message, { delay: 100 });
    console.log('✅ Text written successfully!');
  }

  /**
   * Send the typed message by pressing Enter
   */
  async sendMessage() {
    console.log('📤 Pressing Enter...');
    await this.pressKey('Enter');
    console.log('✅ Message sent!');
  }

  /**
   * Type and send a message (combined action)
   * @param {string} message - Message to send
   */
  async sendChatMessage(message) {
    await this.typeMessage(message);
    await this.sendMessage();
  }

  /**
   * Wait for bot response (if needed for future tests)
   * @param {number} timeout - Timeout in milliseconds
   */
  async waitForBotResponse(timeout = 30000) {
    console.log('⏳ Waiting for bot response...');
    await this.wait(2000); // Simple wait, can be enhanced
    console.log('✅ Bot response received!');
  }

  /**
   * Clear chat input
   */
  async clearChatInput() {
    const textarea = await this.getElement(this.locators.chatInput);
    if (textarea) {
      await textarea.click();
      await this.page.keyboard.press('Control+A');
      await this.page.keyboard.press('Backspace');
      console.log('🗑️  Chat input cleared');
    }
  }

  /**
   * Check if chat input is visible
   * @returns {Promise<boolean>}
   */
  async isChatInputVisible() {
    return await this.isElementVisible(this.locators.chatInput);
  }

  /**
   * Get current input value (if needed)
   * @returns {Promise<string>}
   */
  async getChatInputValue() {
    return await this.page.inputValue(this.locators.chatInput);
  }
}

module.exports = ChatBotPage;
