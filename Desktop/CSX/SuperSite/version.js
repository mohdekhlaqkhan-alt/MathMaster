/**
 * BroPro Version Management
 * This file is the single source of truth for the app version.
 * Update this version number whenever you make changes to force cache refresh.
 * 
 * Format: YYYY.MM.DD.BUILD (e.g., 2026.01.02.1)
 */

const BROPRO_VERSION = '2026.01.03.1';

// Export for use in other scripts
window.BROPRO_VERSION = BROPRO_VERSION;

// Log version for debugging
console.log(`🚀 BroPro v${BROPRO_VERSION}`);
