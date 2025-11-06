const { test, expect } = require('@playwright/test');
const ChatBotPage = require('../pages/ChatBotPage');

/**
 * ChatBot AI - Single Message Test
 */
test.describe('ChatBot AI - Single Message', () => {
  let chatBotPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object
    chatBotPage = new ChatBotPage(page);
    
    // Navigate to ChatBot AI
    await chatBotPage.navigate();
  });

  test('should send "hello world" message successfully', async () => {
    // Verify chat input is visible
    const isVisible = await chatBotPage.isChatInputVisible();
    expect(isVisible).toBeTruthy();

    // Send message
    await chatBotPage.sendChatMessage('hello world');

    // Add a small wait to see the result
    await chatBotPage.wait(2000);
  });

  test('should be able to type in chat input', async () => {
    // Type message without sending
    await chatBotPage.typeMessage('test message');

    // Verify message is in input
    const inputValue = await chatBotPage.getChatInputValue();
    expect(inputValue).toBe('test message');
  });

  test('should clear chat input successfully', async () => {
    // Type a message
    await chatBotPage.typeMessage('test to clear');

    // Clear the input
    await chatBotPage.clearChatInput();

    // Verify input is empty
    const inputValue = await chatBotPage.getChatInputValue();
    expect(inputValue).toBe('');
  });
});
