/**
 * BroPro Logo Generator
 * Creates optimized logo versions from the avatar
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_IMAGE = path.join(__dirname, 'assets/bropro-avatar-original.jpg');
const ICONS_DIR = path.join(__dirname, 'assets/icons');
const ASSETS_DIR = path.join(__dirname, 'assets');

// PWA icon sizes
const ICON_SIZES = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512];

async function generateLogos() {
    console.log('🎨 BroPro Logo Generator\n');

    // Ensure directories exist
    if (!fs.existsSync(ICONS_DIR)) {
        fs.mkdirSync(ICONS_DIR, { recursive: true });
    }

    // Get image metadata
    const metadata = await sharp(SOURCE_IMAGE).metadata();
    console.log(`📷 Source: ${metadata.width}x${metadata.height}`);

    // Calculate crop area - focus on the head/face area (top portion)
    // The avatar has the crown at top and face - we want to capture that
    const cropWidth = Math.min(metadata.width, metadata.height);
    const cropHeight = cropWidth;
    const cropLeft = Math.floor((metadata.width - cropWidth) / 2);
    const cropTop = 0; // Start from top to capture the crown

    console.log(`\n✂️ Cropping to square: ${cropWidth}x${cropHeight}`);

    // Create the base cropped image (square, focused on head)
    const croppedBuffer = await sharp(SOURCE_IMAGE)
        .extract({
            left: cropLeft,
            top: cropTop,
            width: cropWidth,
            height: cropHeight
        })
        .toBuffer();

    // 1. Generate main logo PNG (for navbar, etc.)
    console.log('\n🖼️ Generating main logos...');

    // Logo with padding for better visibility
    await sharp(croppedBuffer)
        .resize(200, 200, { fit: 'cover' })
        .png({ quality: 100 })
        .toFile(path.join(ASSETS_DIR, 'logo.png'));
    console.log('  ✅ logo.png (200x200)');

    // Small logo for navbar
    await sharp(croppedBuffer)
        .resize(40, 40, { fit: 'cover' })
        .png({ quality: 100 })
        .toFile(path.join(ASSETS_DIR, 'logo-small.png'));
    console.log('  ✅ logo-small.png (40x40)');

    // Medium logo
    await sharp(croppedBuffer)
        .resize(100, 100, { fit: 'cover' })
        .png({ quality: 100 })
        .toFile(path.join(ASSETS_DIR, 'logo-medium.png'));
    console.log('  ✅ logo-medium.png (100x100)');

    // 2. Generate circular logo (for avatar-style display)
    console.log('\n⭕ Generating circular logos...');

    // Create circular mask
    const circleSize = 512;
    const circleMask = Buffer.from(
        `<svg width="${circleSize}" height="${circleSize}">
            <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2}" fill="white"/>
        </svg>`
    );

    const circularBuffer = await sharp(croppedBuffer)
        .resize(circleSize, circleSize, { fit: 'cover' })
        .composite([{
            input: circleMask,
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    await sharp(circularBuffer)
        .toFile(path.join(ASSETS_DIR, 'logo-circular.png'));
    console.log('  ✅ logo-circular.png (512x512)');

    // Small circular for navbar
    await sharp(circularBuffer)
        .resize(40, 40)
        .toFile(path.join(ASSETS_DIR, 'logo-circular-small.png'));
    console.log('  ✅ logo-circular-small.png (40x40)');

    // 3. Generate PWA icons
    console.log('\n📱 Generating PWA icons...');

    for (const size of ICON_SIZES) {
        const filename = size <= 32 ? `favicon-${size}x${size}.png` : `icon-${size}x${size}.png`;

        await sharp(croppedBuffer)
            .resize(size, size, { fit: 'cover' })
            .png({ quality: 100 })
            .toFile(path.join(ICONS_DIR, filename));

        console.log(`  ✅ ${filename}`);
    }

    // 4. Generate Apple Touch Icon
    await sharp(croppedBuffer)
        .resize(180, 180, { fit: 'cover' })
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
    console.log('  ✅ apple-touch-icon.png');

    // 5. Generate maskable icon (with safe zone padding)
    console.log('\n🎭 Generating maskable icon...');

    const maskableSize = 512;
    const safeZone = Math.floor(maskableSize * 0.1); // 10% safe zone
    const innerSize = maskableSize - (safeZone * 2);

    // Create maskable with gradient background
    const gradientBg = Buffer.from(
        `<svg width="${maskableSize}" height="${maskableSize}">
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea"/>
                    <stop offset="100%" style="stop-color:#764ba2"/>
                </linearGradient>
            </defs>
            <rect width="${maskableSize}" height="${maskableSize}" fill="url(#grad)"/>
        </svg>`
    );

    const resizedAvatar = await sharp(croppedBuffer)
        .resize(innerSize, innerSize, { fit: 'cover' })
        .toBuffer();

    await sharp(gradientBg)
        .composite([{
            input: resizedAvatar,
            top: safeZone,
            left: safeZone
        }])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'maskable-icon-512x512.png'));
    console.log('  ✅ maskable-icon-512x512.png');

    // 6. Generate badge icon for notifications
    await sharp(croppedBuffer)
        .resize(72, 72, { fit: 'cover' })
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'badge-72x72.png'));
    console.log('  ✅ badge-72x72.png');

    // 7. Generate OG image (for social sharing)
    console.log('\n🌐 Generating social sharing image...');

    const ogWidth = 1200;
    const ogHeight = 630;

    // Create OG image with gradient background and avatar
    const ogBg = Buffer.from(
        `<svg width="${ogWidth}" height="${ogHeight}">
            <defs>
                <linearGradient id="oggrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#0f0f1a"/>
                    <stop offset="50%" style="stop-color:#1a1a2e"/>
                    <stop offset="100%" style="stop-color:#0f0f1a"/>
                </linearGradient>
            </defs>
            <rect width="${ogWidth}" height="${ogHeight}" fill="url(#oggrad)"/>
            <text x="750" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#667eea">BroPro</text>
            <text x="750" y="370" font-family="Arial, sans-serif" font-size="36" fill="#a0aec0">Learn Anything, Master Everything</text>
        </svg>`
    );

    const avatarForOG = await sharp(croppedBuffer)
        .resize(400, 400, { fit: 'cover' })
        .toBuffer();

    await sharp(ogBg)
        .composite([{
            input: avatarForOG,
            top: 115,
            left: 100
        }])
        .png({ quality: 90 })
        .toFile(path.join(ASSETS_DIR, 'og-image.png'));
    console.log('  ✅ og-image.png (1200x630)');

    console.log('\n✨ Logo generation complete!');
    console.log(`📁 Logos saved to: ${ASSETS_DIR}`);
    console.log(`📁 Icons saved to: ${ICONS_DIR}`);
}

generateLogos().catch(console.error);
