# Playwright Test Automation - Makefile
# Usage: make <target>

.PHONY: help install test test-headed test-debug test-single test-multiple report clean all

# Default target
.DEFAULT_GOAL := help

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

## help: Show this help message
help:
	@echo "$(BLUE)Available targets:$(NC)"
	@echo ""
	@echo "$(GREEN)make install$(NC)         - Install all dependencies"
	@echo "$(GREEN)make test$(NC)            - Run all tests in headless mode"
	@echo "$(GREEN)make test-headed$(NC)     - Run all tests with visible browser"
	@echo "$(GREEN)make test-debug$(NC)      - Run tests in debug mode"
	@echo "$(GREEN)make test-single$(NC)     - Run single message test"
	@echo "$(GREEN)make test-multiple$(NC)   - Run multiple messages test"
	@echo "$(GREEN)make report$(NC)          - Open HTML test report"
	@echo "$(GREEN)make report-show$(NC)     - Generate and open HTML report"
	@echo "$(GREEN)make clean$(NC)           - Clean test results and reports"
	@echo "$(GREEN)make clean-all$(NC)       - Clean everything including node_modules"
	@echo "$(GREEN)make all$(NC)             - Install, test, and show report"
	@echo ""

## install: Install dependencies and Playwright browsers
install:
	@echo "$(BLUE)Installing dependencies...$(NC)"
	npm install
	@echo "$(BLUE)Installing Playwright browsers...$(NC)"
	npx playwright install chrome
	@echo "$(GREEN)✓ Installation complete!$(NC)"

## test: Run all tests in headless mode
test:
	@echo "$(BLUE)Running tests in headless mode...$(NC)"
	npx playwright test
	@echo "$(GREEN)✓ Tests completed!$(NC)"

## test-headed: Run all tests with visible browser
test-headed:
	@echo "$(BLUE)Running tests with visible browser...$(NC)"
	npx playwright test --headed
	@echo "$(GREEN)✓ Tests completed!$(NC)"

## test-debug: Run tests in debug mode with Playwright Inspector
test-debug:
	@echo "$(BLUE)Running tests in debug mode...$(NC)"
	npx playwright test --debug

## test-single: Run single message test
test-single:
	@echo "$(BLUE)Running single message test...$(NC)"
	npx playwright test chatbot.test --headed
	@echo "$(GREEN)✓ Test completed!$(NC)"

## test-multiple: Run multiple messages test
test-multiple:
	@echo "$(BLUE)Running multiple messages test...$(NC)"
	npx playwright test chatbot.multiple.test --headed
	@echo "$(GREEN)✓ Test completed!$(NC)"

## report: Open existing HTML test report
report:
	@echo "$(BLUE)Opening test report...$(NC)"
	npx playwright show-report

## report-show: Generate and open HTML test report
report-show: test
	@echo "$(BLUE)Opening test report...$(NC)"
	npx playwright show-report

## clean: Clean test results and reports
clean:
	@echo "$(YELLOW)Cleaning test results and reports...$(NC)"
	@if exist test-results rmdir /s /q test-results
	@if exist playwright-report rmdir /s /q playwright-report
	@if exist screenshots rmdir /s /q screenshots
	@echo "$(GREEN)✓ Cleanup complete!$(NC)"

## clean-all: Clean everything including node_modules
clean-all: clean
	@echo "$(YELLOW)Cleaning node_modules...$(NC)"
	@if exist node_modules rmdir /s /q node_modules
	@if exist package-lock.json del /q package-lock.json
	@echo "$(GREEN)✓ Full cleanup complete!$(NC)"

## all: Install, run tests, and show report
all: install test report-show
	@echo "$(GREEN)✓ All tasks completed!$(NC)"

# Additional utility targets

## test-ui: Run tests in UI mode
test-ui:
	@echo "$(BLUE)Opening Playwright UI mode...$(NC)"
	npx playwright test --ui

## test-trace: Run tests and show trace viewer
test-trace:
	@echo "$(BLUE)Running tests with trace...$(NC)"
	npx playwright test --trace on
	npx playwright show-trace test-results

## codegen: Open Playwright code generator
codegen:
	@echo "$(BLUE)Opening Playwright code generator...$(NC)"
	npx playwright codegen https://chatbotai.com/

## list-tests: List all available tests
list-tests:
	@echo "$(BLUE)Available tests:$(NC)"
	npx playwright test --list

## test-grep: Run tests matching pattern (use PATTERN=your-pattern)
test-grep:
	@echo "$(BLUE)Running tests matching pattern: $(PATTERN)$(NC)"
	npx playwright test --grep "$(PATTERN)"
