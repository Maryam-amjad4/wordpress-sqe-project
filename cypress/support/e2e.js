// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Hide fetch/XHR requests from command log and handle WordPress errors
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  // This is useful for WordPress-specific errors that don't affect test functionality
  
  // Handle cross-origin frame errors (common with WordPress iframes)
  if (err.message.includes('cross-origin frame') || 
      err.message.includes('Blocked a frame with origin') ||
      err.name === 'SecurityError') {
    return false
  }
  
  // Handle WordPress i18n and jQuery errors
  if (err.message.includes('wp-i18n') || err.message.includes('jQuery')) {
    return false
  }
  
  // Handle Gutenberg editor errors
  if (err.message.includes('Cannot destructure property') && err.message.includes('documentElement')) {
    return false
  }
  
  // Handle other common WordPress/Gutenberg errors
  if (err.message.includes('wp.blocks') || 
      err.message.includes('wp.editor') || 
      err.message.includes('wp.data') ||
      err.message.includes('Cannot read properties of null') ||
      err.message.includes('Cannot read property') ||
      err.message.includes('is not a function')) {
    return false
  }
  
  // Handle ResizeObserver errors (common in Gutenberg)
  if (err.message.includes('ResizeObserver')) {
    return false
  }
  
  // we still want to ensure there are no other unexpected errors
  return true
})

// Automatic screenshot capture after each test
afterEach(function() {
  // Get the current test title and spec name
  const testName = this.currentTest.title
  const specName = Cypress.spec.name.replace('.cy.js', '')
  
  // Take a screenshot organized by spec/page name
  // Using 'runner' capture to avoid buffer overflow on large pages
  cy.screenshot(`${specName}/${testName}`, {
    capture: 'runner',
    overwrite: true,
    scale: true,
    disableTimersAndAnimations: true
  })
})

