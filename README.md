# Playwright Automation Framework - Page Object Model

A scalable test automation framework using Playwright and Page Object Model (POM) pattern for ChatBot AI testing.

## 📁 Project Structure

```
appnationcase/
├── pages/                      # Page Object classes
│   ├── BasePage.js            # Base page with common methods
│   └── ChatBotPage.js         # ChatBot AI specific page object
├── tests/                     # Test files (Playwright Test format)
│   ├── chatbot.spec.js        # Single message tests
│   └── chatbot.multiple.spec.js  # Multiple messages tests
├── utils/                     # Utility classes
│   └── BrowserManager.js      # Browser lifecycle management
├── config.js                  # Configuration file
├── playwright.config.js       # Playwright test configuration
├── Makefile                   # Build automation commands
├── MAKEFILE_GUIDE.md          # Makefile usage guide
├── .gitignore                 # Git ignore rules
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 🚀 Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chrome
```

## 📖 Usage

### Using Makefile (Recommended)

```bash
# Show all available commands
make help

# Install dependencies
make install

# Run tests with visible browser
make test-headed

# Run tests in headless mode
make test

# Open HTML report
make report

# Run single message test
make test-single

# Run multiple messages test
make test-multiple

# Debug mode
make test-debug

# Clean test results
make clean
```

### Using NPM Scripts

```bash
# Run all tests (headless)
npm test

# Run tests with visible browser
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests in UI mode
npm run test:ui

# Run single message test
npm run test:single

# Run multiple messages test
npm run test:multiple

# Open test report
npm run report

# Open code generator
npm run codegen
```

## 🏗️ Architecture

### Page Object Model (POM)
This project uses the Page Object Model design pattern, which provides:
- **Reusability**: Page objects can be reused across multiple tests
- **Maintainability**: Changes to UI require updates in one place
- **Readability**: Tests are more readable and easier to understand
- **Scalability**: Easy to add new pages and tests

### Key Components

#### 1. BasePage (`pages/BasePage.js`)
Base class containing common methods used across all pages:
- `navigateTo()` - Navigate to URL
- `click()` - Click element
- `type()` - Type text
- `waitForElement()` - Wait for element
- `pressKey()` - Press keyboard key
- `takeScreenshot()` - Take screenshot
- And more...

#### 2. ChatBotPage (`pages/ChatBotPage.js`)
Page object for ChatBot AI website:
- `navigate()` - Go to ChatBot AI
- `waitForChatInput()` - Wait for chat textarea
- `typeMessage()` - Type a message
- `sendMessage()` - Send the message
- `sendChatMessage()` - Type and send (combined)
- `waitForBotResponse()` - Wait for bot reply
- `clearChatInput()` - Clear the input field

#### 3. BrowserManager (`utils/BrowserManager.js`)
Manages browser lifecycle:
- `launchBrowser()` - Launch browser
- `createContext()` - Create browser context
- `createPage()` - Create new page
- `initialize()` - All-in-one initialization
- `closeBrowser()` - Close browser
- `keepAlive()` - Keep browser open

#### 4. Configuration (`config.js`)
Centralized configuration for:
- Browser settings
- URLs
- Timeouts
- Test data
- Profile settings
- Screenshot settings

## 📝 Creating New Tests

### Example: Create a new test file

```javascript
const BrowserManager = require('../utils/BrowserManager');
const ChatBotPage = require('../pages/ChatBotPage');

async function myNewTest() {
  const browserManager = new BrowserManager();
  
  try {
    const page = await browserManager.initialize();
    const chatBotPage = new ChatBotPage(page);
    
    await chatBotPage.navigate();
    await chatBotPage.sendChatMessage('your message here');
    
    await browserManager.keepAlive();
  } catch (error) {
    console.error('Error:', error.message);
    await browserManager.closeBrowser();
  }
}

myNewTest();
```

## 🎯 Adding New Page Objects

1. Create new page class in `pages/` directory
2. Extend `BasePage`
3. Define locators in constructor
4. Add page-specific methods

Example:
```javascript
const BasePage = require('./BasePage');

class NewPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://example.com';
    this.locators = {
      button: '#submit-btn',
      input: '#user-input'
    };
  }

  async clickButton() {
    await this.click(this.locators.button);
  }
}

module.exports = NewPage;
```

## ⚙️ Configuration

Edit `config.js` to customize:
- Browser settings (headless mode, viewport size)
- Timeouts
- URLs
- Test data
- Chrome profile settings
- Screenshot options

## 🔧 Advanced Features

### Using Custom Chrome Profile
Edit `config.js`:
```javascript
profile: {
  enabled: true,
  userDataDir: 'C:\\Users\\YourName\\AppData\\Local\\Google\\Chrome\\User Data',
  profileName: 'Default'
}
```

### Taking Screenshots
```javascript
await chatBotPage.takeScreenshot('./screenshots/test.png');
```

### Custom Waits
```javascript
await chatBotPage.wait(2000); // Wait 2 seconds
await chatBotPage.waitForElement('#my-element', 5000); // Wait max 5 seconds
```

## � Test Reports

After running tests, you can view detailed reports:

### HTML Report
```bash
make report
# or
npm run report
```

The HTML report includes:
- ✅ Test results with pass/fail status
- 📸 Screenshots on failure
- 🎥 Videos of failed tests
- 📋 Detailed test logs
- ⏱️ Execution times

### Report Formats

1. **HTML Report** - `playwright-report/index.html`
   - Interactive web-based report
   - Screenshots and videos
   - Detailed traces

2. **JSON Report** - `test-results/results.json`
   - Machine-readable format
   - For CI/CD integration

3. **JUnit Report** - `test-results/junit.xml`
   - For Jenkins, GitLab CI, etc.

## 🛠️ Makefile Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make install` | Install dependencies and browsers |
| `make test` | Run tests in headless mode |
| `make test-headed` | Run tests with visible browser |
| `make test-debug` | Run tests in debug mode |
| `make test-single` | Run single message test |
| `make test-multiple` | Run multiple messages test |
| `make test-ui` | Run tests in UI mode |
| `make report` | Open HTML report |
| `make report-show` | Run tests and show report |
| `make codegen` | Open Playwright code generator |
| `make clean` | Clean test results |
| `make clean-all` | Clean everything including node_modules |
| `make all` | Install, test, and show report |

## �🐛 Troubleshooting

**Makefile not working on Windows:**
- Install `make` via Chocolatey: `choco install make`
- Or use NPM scripts instead

**Browser doesn't open:**
- Make sure Chrome is installed
- Run `npx playwright install chrome` or `make install`

**"Target closed" error:**
- Ensure Chrome is completely closed before running
- Check Task Manager for chrome.exe processes

**Element not found:**
- Check if selectors in page object are correct
- Increase timeout in playwright.config.js
- Add wait before action

**Tests fail randomly:**
- Increase timeouts in config
- Add explicit waits
- Check network conditions

## 📚 Best Practices

1. **Keep page objects clean** - Only page-related logic
2. **Use meaningful method names** - Self-documenting code
3. **Centralize selectors** - Define in locators object
4. **Handle errors properly** - Always use try-catch
5. **Keep tests independent** - Each test should work standalone
6. **Use config file** - Avoid hardcoded values
7. **Add comments** - Document complex logic

## 🚦 Future Enhancements

- [ ] Add test reporting (Allure, HTML reports)
- [ ] Integrate with CI/CD (GitHub Actions, Jenkins)
- [ ] Add API testing capabilities
- [ ] Implement data-driven testing
- [ ] Add parallel test execution
- [ ] Add visual regression testing
- [ ] Implement custom logger
- [ ] Add test retry mechanism

## 📄 License

ISC

## 🤝 Contributing

Feel free to add new page objects, tests, and features following the existing patterns!
