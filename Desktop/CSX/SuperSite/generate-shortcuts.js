/**
 * BroPro Shortcut Icon Generator
 * Generates shortcut icons with emojis on gradient backgrounds
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'assets/icons');

const SHORTCUTS = [
    { name: 'shortcut-math', emoji: '📐', gradient: ['#667eea', '#764ba2'] },
    { name: 'shortcut-science', emoji: '🔬', gradient: ['#11998e', '#38ef7d'] },
    { name: 'shortcut-gk', emoji: '🌍', gradient: ['#4facfe', '#00f2fe'] },
    { name: 'shortcut-profile', emoji: '👤', gradient: ['#f093fb', '#f5576c'] }
];

async function generateShortcutIcon(shortcut) {
    const size = 96;
    const [color1, color2] = shortcut.gradient;

    // Create SVG with gradient background and emoji
    const svg = `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="${size}" height="${size}" rx="20" ry="20" fill="url(#grad)"/>
            <text x="50%" y="55%" font-size="48" text-anchor="middle" dominant-baseline="middle">${shortcut.emoji}</text>
        </svg>
    `;

    const outputPath = path.join(OUTPUT_DIR, `${shortcut.name}.png`);

    await sharp(Buffer.from(svg))
        .resize(size, size)
        .png({ quality: 100 })
        .toFile(outputPath);

    console.log(`✅ ${shortcut.name}.png`);
}

async function main() {
    console.log('🚀 Generating shortcut icons...\n');

    for (const shortcut of SHORTCUTS) {
        try {
            await generateShortcutIcon(shortcut);
        } catch (error) {
            console.error(`❌ Failed to generate ${shortcut.name}:`, error.message);
        }
    }

    console.log('\n✨ Shortcut icons generated!');
}

main();
