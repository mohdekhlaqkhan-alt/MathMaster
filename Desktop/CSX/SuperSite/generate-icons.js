/**
 * BroPro PWA Icon Generator
 * Generates all required icon sizes from a source image
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_ICON = path.join(__dirname, 'assets/icons/icon-512x512.png');
const OUTPUT_DIR = path.join(__dirname, 'assets/icons');

// Standard PWA icon sizes
const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];

// Shortcut icons
const SHORTCUT_ICONS = [
    { name: 'shortcut-math', emoji: '📐', bg: ['#667eea', '#764ba2'] },
    { name: 'shortcut-science', emoji: '🔬', bg: ['#11998e', '#38ef7d'] },
    { name: 'shortcut-gk', emoji: '🌍', bg: ['#4facfe', '#00f2fe'] },
    { name: 'shortcut-profile', emoji: '👤', bg: ['#f093fb', '#f5576c'] }
];

async function generateIcons() {
    console.log('🚀 Starting icon generation...\n');

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Check if source exists
    if (!fs.existsSync(SOURCE_ICON)) {
        console.error('❌ Source icon not found:', SOURCE_ICON);
        process.exit(1);
    }

    // Generate standard icons
    console.log('📱 Generating standard icons...');
    for (const size of ICON_SIZES) {
        const outputPath = path.join(OUTPUT_DIR, `icon-${size}x${size}.png`);

        try {
            await sharp(SOURCE_ICON)
                .resize(size, size, {
                    fit: 'cover',
                    kernel: sharp.kernel.lanczos3
                })
                .png({ quality: 100 })
                .toFile(outputPath);

            console.log(`  ✅ icon-${size}x${size}.png`);
        } catch (error) {
            console.error(`  ❌ Failed to generate ${size}x${size}:`, error.message);
        }
    }

    // Generate maskable icon (with padding)
    console.log('\n🎭 Generating maskable icon...');
    try {
        const size = 512;
        const padding = Math.floor(size * 0.1); // 10% padding for safe zone
        const innerSize = size - (padding * 2);

        await sharp(SOURCE_ICON)
            .resize(innerSize, innerSize, {
                fit: 'cover',
                kernel: sharp.kernel.lanczos3
            })
            .extend({
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                background: { r: 102, g: 126, b: 234, alpha: 1 }
            })
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'maskable-icon-512x512.png'));

        console.log('  ✅ maskable-icon-512x512.png');
    } catch (error) {
        console.error('  ❌ Failed to generate maskable icon:', error.message);
    }

    // Generate badge icon for notifications
    console.log('\n🔔 Generating badge icon...');
    try {
        await sharp(SOURCE_ICON)
            .resize(72, 72)
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'badge-72x72.png'));

        console.log('  ✅ badge-72x72.png');
    } catch (error) {
        console.error('  ❌ Failed to generate badge icon:', error.message);
    }

    // Generate monochrome icon
    console.log('\n⚫ Generating monochrome icon...');
    try {
        await sharp(SOURCE_ICON)
            .resize(512, 512)
            .grayscale()
            .threshold(128)
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'monochrome-icon.png'));

        console.log('  ✅ monochrome-icon.png');
    } catch (error) {
        console.error('  ❌ Failed to generate monochrome icon:', error.message);
    }

    // Apple touch icon
    console.log('\n🍎 Generating Apple touch icon...');
    try {
        await sharp(SOURCE_ICON)
            .resize(180, 180)
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));

        console.log('  ✅ apple-touch-icon.png');
    } catch (error) {
        console.error('  ❌ Failed to generate Apple touch icon:', error.message);
    }

    // Favicon
    console.log('\n🌐 Generating favicon...');
    try {
        await sharp(SOURCE_ICON)
            .resize(32, 32)
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));

        await sharp(SOURCE_ICON)
            .resize(16, 16)
            .png({ quality: 100 })
            .toFile(path.join(OUTPUT_DIR, 'favicon-16x16.png'));

        console.log('  ✅ favicon-32x32.png');
        console.log('  ✅ favicon-16x16.png');
    } catch (error) {
        console.error('  ❌ Failed to generate favicon:', error.message);
    }

    console.log('\n✨ Icon generation complete!');
    console.log(`📁 Icons saved to: ${OUTPUT_DIR}`);
}

// Run the generator
generateIcons().catch(console.error);
