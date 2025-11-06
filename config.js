/**
 * Configuration file for the project
 * Centralized place for all configuration settings
 */

module.exports = {
  // Browser configuration
  browser: {
    headless: false,
    channel: 'chrome',
    slowMo: 0, // Delay between operations in ms
    viewport: {
      width: 1280,
      height: 720
    }
  },

  // URL configuration
  urls: {
    chatBot: 'https://chatbotai.com/',
    // Add more URLs as needed
  },

  // Timeouts (in milliseconds)
  timeouts: {
    default: 10000,
    navigation: 60000,
    element: 10000,
    response: 30000
  },

  // Test data
  testData: {
    defaultMessage: 'hello world',
    multipleMessages: [
      'hello world',
      'how are you?',
      'what can you do?'
    ]
  },

  // Chrome profile settings (optional)
  profile: {
    enabled: false, // Set to true to use custom profile
    userDataDir: 'C:\\Users\\musta\\AppData\\Local\\Google\\Chrome\\User Data',
    profileName: 'Default'
  },

  // Screenshot settings
  screenshots: {
    enabled: false,
    path: './screenshots/',
    onError: true
  }
};
