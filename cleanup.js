// Run this file with: node cleanup.js
// It will remove all unwanted documentation files

const fs = require('fs');
const path = require('path');

const dir = __dirname;

// Files to delete (keeping README.md, package.json, etc.)
const filesToDelete = [
  'ANIMATED_LOGIN_CHARACTER.md',
  'ANIME_CHARACTER_PREVIEW.md',
  'ATTRIBUTIONS.md',
  'BROWSE_PAGE_ENHANCED.md',
  'BROWSE_PAGE_FIXED.md',
  'CART_CHECKOUT_FLOW.md',
  'CHARACTER_COMPARISON.md',
  'CHARACTER_IMAGE_SETUP.md',
  'CHARACTER_STATES_GUIDE.md',
  'CHOOSE_YOUR_CHARACTER.md',
  'ERROR_FREE_CONFIRMATION.md',
  'FIXES_APPLIED.md',
  'IMPLEMENTATION_COMPLETE.md',
  'INTERACTIVE_BACKGROUND_GUIDE.md',
  'LOGIN_PAGE_ERROR_FIXED.md',
  'PREMIUM_CHARACTER_FEATURES.md',
  'PREMIUM_UPGRADE_SUMMARY.md',
  'START_HERE.md',
  'SUBSCRIPTION_UPGRADE_FLOW.md',
  'setup-character.bat',
  'validate.js'
];

console.log('🧹 Cleaning up unwanted files...\n');

// Delete files
let deletedCount = 0;
filesToDelete.forEach(file => {
  const filePath = path.join(dir, file);
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('✅ Deleted:', file);
      deletedCount++;
    }
  } catch (e) {
    console.log('❌ Error deleting', file + ':', e.message);
  }
});

// Delete guidelines folder
const guidelinesPath = path.join(dir, 'guidelines');
try {
  if (fs.existsSync(guidelinesPath)) {
    fs.rmSync(guidelinesPath, { recursive: true, force: true });
    console.log('✅ Deleted: guidelines/ folder');
    deletedCount++;
  }
} catch (e) {
  console.log('❌ Error deleting guidelines:', e.message);
}

console.log(`\n🎉 Cleanup complete! Removed ${deletedCount} items.\n`);

// Show remaining files
console.log('📁 Remaining files in Frontend folder:');
fs.readdirSync(dir)
  .filter(f => !f.startsWith('.') && f !== 'node_modules' && f !== 'dist')
  .forEach(f => console.log('   ', f));

// Self-delete this cleanup script
try {
  fs.unlinkSync(__filename);
  console.log('\n🗑️  Cleanup script self-deleted.');
} catch (e) {
  console.log('\n⚠️  Please manually delete cleanup.js');
}
