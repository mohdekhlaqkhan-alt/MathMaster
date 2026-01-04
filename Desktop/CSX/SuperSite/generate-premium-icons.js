/**
 * BroPro Premium PWA Icon Generator
 * Creates stunning, app-store quality icons with gradient backgrounds
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_AVATAR = path.join(__dirname, 'assets/bropro-avatar-original.jpg');
const ICONS_DIR = path.join(__dirname, 'assets/icons');

// PWA icon sizes
const ICON_SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];

// Premium gradient background (purple to blue - matches BroPro brand)
function createGradientBg(size) {
    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Main gradient -->
                <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea"/>
                    <stop offset="50%" style="stop-color:#764ba2"/>
                    <stop offset="100%" style="stop-color:#f093fb"/>
                </linearGradient>
                
                <!-- Glow effect -->
                <radialGradient id="glow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" style="stop-color:rgba(255,255,255,0.3)"/>
                    <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
                </radialGradient>
                
                <!-- Bottom shadow -->
                <linearGradient id="bottomShade" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="70%" style="stop-color:rgba(0,0,0,0)"/>
                    <stop offset="100%" style="stop-color:rgba(0,0,0,0.3)"/>
                </linearGradient>
            </defs>
            
            <!-- Background gradient -->
            <rect width="${size}" height="${size}" fill="url(#mainGrad)"/>
            
            <!-- Top glow -->
            <rect width="${size}" height="${size}" fill="url(#glow)"/>
            
            <!-- Bottom shade for depth -->
            <rect width="${size}" height="${size}" fill="url(#bottomShade)"/>
            
            <!-- Subtle pattern overlay -->
            <circle cx="${size * 0.2}" cy="${size * 0.2}" r="${size * 0.3}" fill="rgba(255,255,255,0.05)"/>
            <circle cx="${size * 0.8}" cy="${size * 0.8}" r="${size * 0.25}" fill="rgba(255,255,255,0.03)"/>
        </svg>
    `);
}

// Create circular mask for avatar
function createCircleMask(size) {
    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
        </svg>
    `);
}

// Create avatar border ring
function createBorderRing(size, avatarSize) {
    const centerX = size / 2;
    const centerY = size / 2;
    const ringRadius = avatarSize / 2 + 3;

    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fff"/>
                    <stop offset="50%" style="stop-color:rgba(255,255,255,0.8)"/>
                    <stop offset="100%" style="stop-color:#ffd700"/>
                </linearGradient>
            </defs>
            <circle cx="${centerX}" cy="${centerY}" r="${ringRadius}" 
                    fill="none" stroke="url(#ringGrad)" stroke-width="3"/>
        </svg>
    `);
}

// Crown overlay for premium feel
function createCrownOverlay(size) {
    const crownSize = Math.floor(size * 0.25);
    const crownX = size / 2 - crownSize / 2;
    const crownY = size * 0.08;

    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ffd700"/>
                    <stop offset="100%" style="stop-color:#ffaa00"/>
                </linearGradient>
                <filter id="crownGlow">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <text x="${size / 2}" y="${crownY + crownSize * 0.7}" 
                  font-size="${crownSize}" 
                  text-anchor="middle" 
                  filter="url(#crownGlow)">👑</text>
        </svg>
    `);
}

async function generatePremiumIcons() {
    console.log('🎨 BroPro Premium Icon Generator\n');
    console.log('Creating stunning, app-store quality icons...\n');

    // Ensure output directory exists
    if (!fs.existsSync(ICONS_DIR)) {
        fs.mkdirSync(ICONS_DIR, { recursive: true });
    }

    // Get source image
    const metadata = await sharp(SOURCE_AVATAR).metadata();
    console.log(`📷 Source avatar: ${metadata.width}x${metadata.height}\n`);

    // Prepare avatar (crop to square, focus on head with crown)
    const cropSize = Math.min(metadata.width, metadata.height);
    const croppedAvatar = await sharp(SOURCE_AVATAR)
        .extract({
            left: Math.floor((metadata.width - cropSize) / 2),
            top: 0,
            width: cropSize,
            height: cropSize
        })
        .toBuffer();

    // Generate premium icons for each size
    console.log('📱 Generating premium PWA icons...');

    for (const size of ICON_SIZES) {
        try {
            // Avatar size (80% of icon for larger icons, 75% for smaller)
            const avatarPercent = size >= 192 ? 0.80 : 0.75;
            const avatarSize = Math.floor(size * avatarPercent);
            const avatarOffset = Math.floor((size - avatarSize) / 2);

            // Create gradient background
            const bgBuffer = createGradientBg(size);

            // Resize avatar with circular mask
            const circleMask = createCircleMask(avatarSize);
            const circularAvatar = await sharp(croppedAvatar)
                .resize(avatarSize, avatarSize, { fit: 'cover' })
                .composite([{
                    input: circleMask,
                    blend: 'dest-in'
                }])
                .png()
                .toBuffer();

            // Create border ring
            const borderRing = createBorderRing(size, avatarSize);

            // Compose final icon
            const finalIcon = await sharp(bgBuffer)
                .composite([
                    // Avatar
                    {
                        input: circularAvatar,
                        top: avatarOffset,
                        left: avatarOffset
                    },
                    // Border ring
                    {
                        input: borderRing,
                        top: 0,
                        left: 0
                    }
                ])
                .png({ quality: 100 })
                .toBuffer();

            // Save icon
            const filename = `icon-${size}x${size}.png`;
            await sharp(finalIcon).toFile(path.join(ICONS_DIR, filename));
            console.log(`  ✅ ${filename}`);

        } catch (error) {
            console.error(`  ❌ ${size}x${size} failed:`, error.message);
        }
    }

    // Generate special icons
    console.log('\n🌟 Generating special icons...');

    // Favicon (needs to be extra crisp at small size)
    for (const size of [16, 32]) {
        const avatarSize = Math.floor(size * 0.85);
        const avatarOffset = Math.floor((size - avatarSize) / 2);

        const bgBuffer = createGradientBg(size);
        const resizedAvatar = await sharp(croppedAvatar)
            .resize(avatarSize, avatarSize, { fit: 'cover' })
            .toBuffer();

        await sharp(bgBuffer)
            .composite([{
                input: resizedAvatar,
                top: avatarOffset,
                left: avatarOffset
            }])
            .png({ quality: 100 })
            .toFile(path.join(ICONS_DIR, `favicon-${size}x${size}.png`));

        console.log(`  ✅ favicon-${size}x${size}.png`);
    }

    // Apple Touch Icon (180x180) - needs to look great on iOS
    const appleSize = 180;
    const appleAvatarSize = Math.floor(appleSize * 0.78);
    const appleOffset = Math.floor((appleSize - appleAvatarSize) / 2);

    const appleBg = createGradientBg(appleSize);
    const appleCircleMask = createCircleMask(appleAvatarSize);
    const appleAvatar = await sharp(croppedAvatar)
        .resize(appleAvatarSize, appleAvatarSize, { fit: 'cover' })
        .composite([{
            input: appleCircleMask,
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    const appleBorderRing = createBorderRing(appleSize, appleAvatarSize);

    await sharp(appleBg)
        .composite([
            { input: appleAvatar, top: appleOffset, left: appleOffset },
            { input: appleBorderRing, top: 0, left: 0 }
        ])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
    console.log('  ✅ apple-touch-icon.png');

    // Maskable Icon (512x512 with extra padding for safe zone)
    console.log('\n🎭 Generating maskable icon...');
    const maskableSize = 512;
    const safeZone = Math.floor(maskableSize * 0.10); // 10% safe zone
    const maskableAvatarSize = Math.floor(maskableSize * 0.65);
    const maskableOffset = Math.floor((maskableSize - maskableAvatarSize) / 2);

    const maskableBg = createGradientBg(maskableSize);
    const maskableCircleMask = createCircleMask(maskableAvatarSize);
    const maskableAvatar = await sharp(croppedAvatar)
        .resize(maskableAvatarSize, maskableAvatarSize, { fit: 'cover' })
        .composite([{
            input: maskableCircleMask,
            blend: 'dest-in'
        }])
        .png()
        .toBuffer();

    const maskableBorderRing = createBorderRing(maskableSize, maskableAvatarSize);

    await sharp(maskableBg)
        .composite([
            { input: maskableAvatar, top: maskableOffset, left: maskableOffset },
            { input: maskableBorderRing, top: 0, left: 0 }
        ])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'maskable-icon-512x512.png'));
    console.log('  ✅ maskable-icon-512x512.png');

    // Badge icon for notifications (simple, clean)
    const badgeSize = 72;
    const badgeAvatarSize = Math.floor(badgeSize * 0.9);
    const badgeOffset = Math.floor((badgeSize - badgeAvatarSize) / 2);

    const badgeBg = createGradientBg(badgeSize);
    const badgeAvatar = await sharp(croppedAvatar)
        .resize(badgeAvatarSize, badgeAvatarSize, { fit: 'cover' })
        .toBuffer();

    await sharp(badgeBg)
        .composite([{
            input: badgeAvatar,
            top: badgeOffset,
            left: badgeOffset
        }])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'badge-72x72.png'));
    console.log('  ✅ badge-72x72.png');

    console.log('\n✨ Premium icon generation complete!');
    console.log('📁 Icons saved to:', ICONS_DIR);
    console.log('\n💡 Pro tip: Clear browser cache and reinstall PWA to see new icons!');
}

generatePremiumIcons().catch(console.error);
