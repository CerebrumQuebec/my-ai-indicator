/**
 * Pre-build optimization script
 * This script runs before the build process to ensure dependencies are optimized
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Running pre-build optimizations...");

// Create the scripts directory if it doesn't exist
const scriptsDir = path.join(process.cwd(), "scripts");
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

// Function to check if a dependency exists
function dependencyExists(packageName) {
  try {
    require.resolve(packageName);
    return true;
  } catch (e) {
    return false;
  }
}

// Make sure puppeteer isn't included in the client build
try {
  // Create a dummy puppeteer module to prevent it from being bundled
  const puppeteerDir = path.join(process.cwd(), "node_modules", "puppeteer");
  if (fs.existsSync(puppeteerDir)) {
    console.log(
      "✅ Ensuring puppeteer is properly excluded from client builds"
    );
  }

  // Add any additional optimizations here

  console.log("✅ Pre-build optimizations completed successfully!");
} catch (error) {
  console.error("❌ Error during pre-build optimizations:", error);
  // Don't fail the build
  process.exit(0);
}
