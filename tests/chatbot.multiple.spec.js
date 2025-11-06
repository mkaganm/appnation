const { test, expect } = require('@playwright/test');
const ChatBotPage = require('../pages/ChatBotPage');

/**
 * ChatBot AI - Multiple Messages Test
 */
test.describe('ChatBot AI - Multiple Messages', () => {
  let chatBotPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object
    chatBotPage = new ChatBotPage(page);
    
    // Navigate to ChatBot AI
    await chatBotPage.navigate();
  });

  test('should send multiple messages successfully', async () => {
    // List of messages to send
    const messages = [
      'hello world',
      'how are you?',
      'what can you do?'
    ];

    // Send each message
    for (const message of messages) {
      console.log(`\n--- Sending message: "${message}" ---`);
      
      await chatBotPage.sendChatMessage(message);
      
      // Wait for bot response
      await chatBotPage.waitForBotResponse();
      
      // Wait between messages
      await chatBotPage.wait(2000);
    }

    console.log('\n✅ All messages sent successfully!');
  });

  test('should handle rapid message sending', async () => {
    const quickMessages = ['Hi', 'Hello', 'Hey'];

    for (const message of quickMessages) {
      await chatBotPage.sendChatMessage(message);
      await chatBotPage.wait(500); // Shorter wait
    }
  });

  test('should send different types of messages', async () => {
    const diverseMessages = [
      'What is AI?',
      'Tell me a joke',
      'What is 2+2?',
      'Thank you!'
    ];

    for (const message of diverseMessages) {
      await chatBotPage.sendChatMessage(message);
      await chatBotPage.wait(1500);
    }
  });
});
