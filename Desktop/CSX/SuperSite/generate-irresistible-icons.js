/**
 * BroPro IRRESISTIBLE Icon Generator
 * Uses Color Psychology to create icons that DEMAND attention
 * 
 * Psychology Used:
 * - RED: Urgency, excitement, "must click now"
 * - ORANGE: Energy, enthusiasm, warmth
 * - GOLD/YELLOW: Optimism, happiness, premium value
 * - GLOW EFFECT: Makes icon look "alive" and active
 * - HIGH SATURATION: Pops against any wallpaper
 * 
 * Inspired by: YouTube, Netflix, Instagram, Snapchat icons
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SOURCE_AVATAR = path.join(__dirname, 'assets/bropro-avatar-original.jpg');
const ICONS_DIR = path.join(__dirname, 'assets/icons');

const ICON_SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];

// PSYCHOLOGY-OPTIMIZED GRADIENT
// Red → Orange → Gold - The most attention-grabbing combination
// This is what YouTube, Netflix use - triggers urgency and excitement
function createIrresistibleBackground(size) {
    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <!-- Main fiery gradient - RED to ORANGE to GOLD -->
                <linearGradient id="fireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff1744"/>
                    <stop offset="35%" style="stop-color:#ff6b35"/>
                    <stop offset="70%" style="stop-color:#ffa726"/>
                    <stop offset="100%" style="stop-color:#ffca28"/>
                </linearGradient>
                
                <!-- Outer glow - makes icon look like it's EMITTING light -->
                <radialGradient id="outerGlow" cx="50%" cy="50%" r="55%">
                    <stop offset="0%" style="stop-color:rgba(255,255,255,0)"/>
                    <stop offset="70%" style="stop-color:rgba(255,255,255,0)"/>
                    <stop offset="100%" style="stop-color:rgba(255,200,50,0.4)"/>
                </radialGradient>
                
                <!-- Inner shine - premium feel -->
                <radialGradient id="innerShine" cx="30%" cy="25%" r="50%">
                    <stop offset="0%" style="stop-color:rgba(255,255,255,0.5)"/>
                    <stop offset="100%" style="stop-color:rgba(255,255,255,0)"/>
                </radialGradient>
                
                <!-- Bottom depth - 3D effect -->
                <linearGradient id="bottomDepth" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:rgba(0,0,0,0)"/>
                    <stop offset="80%" style="stop-color:rgba(0,0,0,0)"/>
                    <stop offset="100%" style="stop-color:rgba(0,0,0,0.25)"/>
                </linearGradient>
                
                <!-- Sparkle filter -->
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Base gradient -->
            <rect width="${size}" height="${size}" fill="url(#fireGrad)"/>
            
            <!-- Premium shine -->
            <rect width="${size}" height="${size}" fill="url(#innerShine)"/>
            
            <!-- 3D depth -->
            <rect width="${size}" height="${size}" fill="url(#bottomDepth)"/>
            
            <!-- Outer glow (makes it POP) -->
            <rect width="${size}" height="${size}" fill="url(#outerGlow)"/>
            
            <!-- Decorative sparkles for premium feel -->
            <circle cx="${size * 0.15}" cy="${size * 0.12}" r="${size * 0.015}" fill="rgba(255,255,255,0.9)" filter="url(#glow)"/>
            <circle cx="${size * 0.88}" cy="${size * 0.2}" r="${size * 0.01}" fill="rgba(255,255,255,0.7)" filter="url(#glow)"/>
            <circle cx="${size * 0.92}" cy="${size * 0.85}" r="${size * 0.012}" fill="rgba(255,255,255,0.6)" filter="url(#glow)"/>
        </svg>
    `);
}

// Golden ring around avatar - premium luxury feel
function createGoldenRing(size, avatarSize) {
    const ringRadius = avatarSize / 2 + 4;
    const cx = size / 2;
    const cy = size / 2;

    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#fff9c4"/>
                    <stop offset="25%" style="stop-color:#ffd700"/>
                    <stop offset="50%" style="stop-color:#fff176"/>
                    <stop offset="75%" style="stop-color:#ffc107"/>
                    <stop offset="100%" style="stop-color:#ffab00"/>
                </linearGradient>
                <filter id="ringGlow">
                    <feGaussianBlur stdDeviation="1.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>
            <circle cx="${cx}" cy="${cy}" r="${ringRadius}" 
                    fill="none" 
                    stroke="url(#goldRing)" 
                    stroke-width="4"
                    filter="url(#ringGlow)"/>
        </svg>
    `);
}

// Circle mask for avatar
function createCircleMask(size) {
    return Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
        </svg>
    `);
}

async function generateIrresistibleIcons() {
    console.log('🔥 BroPro IRRESISTIBLE Icon Generator');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Using Color Psychology to create icons that DEMAND attention\n');
    console.log('Psychology Applied:');
    console.log('  🔴 RED → Urgency, "must click now"');
    console.log('  🟠 ORANGE → Energy, enthusiasm');
    console.log('  🟡 GOLD → Premium value, happiness');
    console.log('  ✨ GLOW → Icon looks alive and active\n');

    if (!fs.existsSync(ICONS_DIR)) {
        fs.mkdirSync(ICONS_DIR, { recursive: true });
    }

    // Prepare avatar
    const metadata = await sharp(SOURCE_AVATAR).metadata();
    const cropSize = Math.min(metadata.width, metadata.height);
    const croppedAvatar = await sharp(SOURCE_AVATAR)
        .extract({
            left: Math.floor((metadata.width - cropSize) / 2),
            top: 0,
            width: cropSize,
            height: cropSize
        })
        .toBuffer();

    console.log('📱 Generating ATTENTION-GRABBING icons...\n');

    for (const size of ICON_SIZES) {
        try {
            // Avatar takes 70% of icon for maximum impact
            const avatarPercent = size >= 192 ? 0.72 : 0.68;
            const avatarSize = Math.floor(size * avatarPercent);
            const offset = Math.floor((size - avatarSize) / 2);

            // Create irresistible background
            const bg = createIrresistibleBackground(size);

            // Create circular avatar
            const mask = createCircleMask(avatarSize);
            const circularAvatar = await sharp(croppedAvatar)
                .resize(avatarSize, avatarSize, { fit: 'cover' })
                // Slightly increase saturation for more vibrancy
                .modulate({ saturation: 1.1, brightness: 1.02 })
                .composite([{ input: mask, blend: 'dest-in' }])
                .png()
                .toBuffer();

            // Create golden ring
            const ring = createGoldenRing(size, avatarSize);

            // Compose final icon
            const finalIcon = await sharp(bg)
                .composite([
                    { input: circularAvatar, top: offset, left: offset },
                    { input: ring, top: 0, left: 0 }
                ])
                .png({ quality: 100 })
                .toBuffer();

            await sharp(finalIcon).toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));
            console.log(`  🔥 icon-${size}x${size}.png - CREATED`);

        } catch (err) {
            console.error(`  ❌ ${size}x${size} failed:`, err.message);
        }
    }

    // Favicons
    console.log('\n🌟 Generating PUNCHY favicons...');
    for (const size of [16, 32]) {
        const avatarSize = Math.floor(size * 0.82);
        const offset = Math.floor((size - avatarSize) / 2);

        const bg = createIrresistibleBackground(size);
        const avatar = await sharp(croppedAvatar)
            .resize(avatarSize, avatarSize, { fit: 'cover' })
            .toBuffer();

        await sharp(bg)
            .composite([{ input: avatar, top: offset, left: offset }])
            .png({ quality: 100 })
            .toFile(path.join(ICONS_DIR, `favicon-${size}x${size}.png`));

        console.log(`  🔥 favicon-${size}x${size}.png`);
    }

    // Apple Touch Icon
    console.log('\n🍎 Generating Apple Touch Icon...');
    const appleSize = 180;
    const appleAvatarSize = Math.floor(appleSize * 0.70);
    const appleOffset = Math.floor((appleSize - appleAvatarSize) / 2);

    const appleBg = createIrresistibleBackground(appleSize);
    const appleMask = createCircleMask(appleAvatarSize);
    const appleAvatar = await sharp(croppedAvatar)
        .resize(appleAvatarSize, appleAvatarSize, { fit: 'cover' })
        .modulate({ saturation: 1.1, brightness: 1.02 })
        .composite([{ input: appleMask, blend: 'dest-in' }])
        .png()
        .toBuffer();
    const appleRing = createGoldenRing(appleSize, appleAvatarSize);

    await sharp(appleBg)
        .composite([
            { input: appleAvatar, top: appleOffset, left: appleOffset },
            { input: appleRing, top: 0, left: 0 }
        ])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
    console.log('  🔥 apple-touch-icon.png');

    // Maskable Icon (for adaptive icons on Android)
    console.log('\n🎭 Generating Maskable Icon (Android adaptive)...');
    const maskableSize = 512;
    const maskableAvatarSize = Math.floor(maskableSize * 0.58); // Smaller for safe zone
    const maskableOffset = Math.floor((maskableSize - maskableAvatarSize) / 2);

    const maskableBg = createIrresistibleBackground(maskableSize);
    const maskableMask = createCircleMask(maskableAvatarSize);
    const maskableAvatar = await sharp(croppedAvatar)
        .resize(maskableAvatarSize, maskableAvatarSize, { fit: 'cover' })
        .modulate({ saturation: 1.1, brightness: 1.02 })
        .composite([{ input: maskableMask, blend: 'dest-in' }])
        .png()
        .toBuffer();
    const maskableRing = createGoldenRing(maskableSize, maskableAvatarSize);

    await sharp(maskableBg)
        .composite([
            { input: maskableAvatar, top: maskableOffset, left: maskableOffset },
            { input: maskableRing, top: 0, left: 0 }
        ])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'maskable-icon-512x512.png'));
    console.log('  🔥 maskable-icon-512x512.png');

    // Badge icon
    console.log('\n🔔 Generating Notification Badge...');
    const badgeSize = 72;
    const badgeAvatarSize = Math.floor(badgeSize * 0.85);
    const badgeOffset = Math.floor((badgeSize - badgeAvatarSize) / 2);

    const badgeBg = createIrresistibleBackground(badgeSize);
    const badgeAvatar = await sharp(croppedAvatar)
        .resize(badgeAvatarSize, badgeAvatarSize, { fit: 'cover' })
        .toBuffer();

    await sharp(badgeBg)
        .composite([{ input: badgeAvatar, top: badgeOffset, left: badgeOffset }])
        .png({ quality: 100 })
        .toFile(path.join(ICONS_DIR, 'badge-72x72.png'));
    console.log('  🔥 badge-72x72.png');

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ IRRESISTIBLE icons generated!');
    console.log('');
    console.log('🧠 Why these icons will GRAB attention:');
    console.log('   • Red-Orange-Gold gradient = #1 attention color combo');
    console.log('   • Same psychology as YouTube, Netflix, Instagram');
    console.log('   • Golden ring = Premium, valuable feel');
    console.log('   • Glow effect = Icon looks "alive"');
    console.log('   • High saturation = Pops on ANY wallpaper');
    console.log('');
    console.log('📲 Reinstall the PWA to see the new icons!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

generateIrresistibleIcons().catch(console.error);
