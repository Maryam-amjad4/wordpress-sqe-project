# Phase 4 Test Validation Script
# This script validates that all test files are properly structured

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Phase 4 Test Validation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$errors = @()
$warnings = @()

# Check PHPUnit Test Files
Write-Host "Checking PHPUnit Tests..." -ForegroundColor Yellow

$phpTestFiles = @(
    "tests/unit/UserTest.php",
    "tests/unit/PostTest.php",
    "tests/unit/DatabaseTest.php",
    "tests/integration/AuthenticationTest.php",
    "tests/integration/APITest.php"
)

foreach ($file in $phpTestFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Check for required class structure
        if ($content -match "class\s+\w+Test\s+extends") {
            Write-Host "  [OK] $file - Has valid class structure" -ForegroundColor Green
        } else {
            $errors += "$file - Missing valid test class"
            Write-Host "  [ERROR] $file - Missing valid test class" -ForegroundColor Red
        }
        
        # Check for test methods
        if ($content -match "public function test_") {
            $testCount = ([regex]::Matches($content, "public function test_")).Count
            Write-Host "    Found $testCount test methods" -ForegroundColor Gray
        } else {
            $warnings += "$file - No test methods found"
            Write-Host "  [WARNING] $file - No test methods found" -ForegroundColor Yellow
        }
        
        # Check for namespace
        if ($content -match "namespace\s+Tests\\") {
            Write-Host "    Has proper namespace" -ForegroundColor Gray
        } else {
            $warnings += "$file - Missing namespace"
            Write-Host "  [WARNING] $file - Missing namespace" -ForegroundColor Yellow
        }
    } else {
        $errors += "$file - File not found"
        Write-Host "  [ERROR] $file - File not found" -ForegroundColor Red
    }
}

Write-Host ""

# Check Cypress Test Files
Write-Host "Checking Cypress Tests..." -ForegroundColor Yellow

$cypressTestFiles = @(
    "cypress/e2e/login.cy.js",
    "cypress/e2e/posts.cy.js",
    "cypress/e2e/pages.cy.js",
    "cypress/e2e/navigation.cy.js"
)

foreach ($file in $cypressTestFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        # Check for describe block
        if ($content -match "describe\(") {
            Write-Host "  [OK] $file - Has describe block" -ForegroundColor Green
        } else {
            $errors += "$file - Missing describe block"
            Write-Host "  [ERROR] $file - Missing describe block" -ForegroundColor Red
        }
        
        # Check for test cases (it blocks)
        if ($content -match "it\(") {
            $testCount = ([regex]::Matches($content, "it\(")).Count
            Write-Host "    Found $testCount test cases" -ForegroundColor Gray
        } else {
            $warnings += "$file - No test cases found"
            Write-Host "  [WARNING] $file - No test cases found" -ForegroundColor Yellow
        }
    } else {
        $errors += "$file - File not found"
        Write-Host "  [ERROR] $file - File not found" -ForegroundColor Red
    }
}

Write-Host ""

# Check Configuration Files
Write-Host "Checking Configuration Files..." -ForegroundColor Yellow

$configFiles = @(
    "phpunit.xml",
    "cypress.config.js",
    "tests/bootstrap.php",
    "cypress/support/commands.js"
)

foreach ($file in $configFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file exists" -ForegroundColor Green
    } else {
        $errors += "$file - Configuration file not found"
        Write-Host "  [ERROR] $file - Configuration file not found" -ForegroundColor Red
    }
}

Write-Host ""

# Check Package Files
Write-Host "Checking Dependencies..." -ForegroundColor Yellow

if (Test-Path "composer.json") {
    $composer = Get-Content "composer.json" -Raw | ConvertFrom-Json
    if ($composer.'require-dev'.'phpunit/phpunit') {
        Write-Host "  [OK] PHPUnit in composer.json" -ForegroundColor Green
    } else {
        $warnings += "PHPUnit not found in composer.json"
        Write-Host "  [WARNING] PHPUnit not found in composer.json" -ForegroundColor Yellow
    }
} else {
    $errors += "composer.json not found"
    Write-Host "  [ERROR] composer.json not found" -ForegroundColor Red
}

if (Test-Path "package.json") {
    $package = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($package.devDependencies.cypress) {
        Write-Host "  [OK] Cypress in package.json" -ForegroundColor Green
    } else {
        $warnings += "Cypress not found in package.json"
        Write-Host "  [WARNING] Cypress not found in package.json" -ForegroundColor Yellow
    }
} else {
    $errors += "package.json not found"
    Write-Host "  [ERROR] package.json not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Validation Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if ($errors.Count -eq 0) {
    Write-Host "[SUCCESS] No critical errors found!" -ForegroundColor Green
} else {
    Write-Host "[ERRORS] Found $($errors.Count) critical error(s):" -ForegroundColor Red
    foreach ($error in $errors) {
        Write-Host "  - $error" -ForegroundColor Red
    }
}

if ($warnings.Count -gt 0) {
    Write-Host "[WARNINGS] Found $($warnings.Count) warning(s):" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  - $warning" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start WordPress: docker-compose up -d" -ForegroundColor White
Write-Host "2. Install dependencies: composer install && npm install" -ForegroundColor White
Write-Host "3. Run PHPUnit tests: ./vendor/bin/phpunit" -ForegroundColor White
Write-Host "4. Run Cypress tests: npm test" -ForegroundColor White

