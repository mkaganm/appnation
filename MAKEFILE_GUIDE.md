# Makefile Quick Reference

## Windows Setup (PowerShell)

If you don't have `make` installed on Windows, you have two options:

### Option 1: Install Make via Chocolatey
```powershell
# Install Chocolatey first (if not installed)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Make
choco install make
```

### Option 2: Use NPM Scripts (Alternative)
If you prefer not to install `make`, use the equivalent NPM commands:

| Makefile Command | NPM Equivalent |
|------------------|----------------|
| `make install` | `npm install && npx playwright install chrome` |
| `make test` | `npm test` |
| `make test-headed` | `npm run test:headed` |
| `make test-debug` | `npm run test:debug` |
| `make test-single` | `npm run test:single` |
| `make test-multiple` | `npm run test:multiple` |
| `make report` | `npm run report` |
| `make clean` | Remove folders manually or use PowerShell |

## Common Workflows

### First Time Setup
```bash
make install
```

### Run Tests with Browser Visible
```bash
make test-headed
```

### Run Tests and View Report
```bash
make test
make report
```

### Debug a Failing Test
```bash
make test-debug
```

### Clean and Start Fresh
```bash
make clean-all
make install
make test
```

### Quick Test-Report Cycle
```bash
make report-show
```

## Makefile Benefits

✅ **Shorter commands** - `make test` vs `npx playwright test`
✅ **Consistent interface** - Same commands across projects
✅ **Automation** - Combine multiple steps in one command
✅ **Documentation** - Self-documenting with `make help`
✅ **Colored output** - Better readability
✅ **Cross-platform** - Works on Windows, Mac, Linux

## Tips

- Run `make help` anytime to see all available commands
- Use `make test-headed` during development to see what's happening
- Use `make test` (headless) for CI/CD pipelines
- Check reports after every test run with `make report`
- Use `make codegen` to record new test actions
