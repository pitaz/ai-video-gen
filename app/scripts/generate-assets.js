#!/usr/bin/env node

/**
 * Generate placeholder PNG assets for Expo app
 * Run: yarn generate-assets (or: node scripts/generate-assets.js)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Create a simple PNG with text
async function createPNGAsset(name, size, text, bgColor = '#1A73E8', textColor = '#FFFFFF') {
    const fontSize = Math.floor(size * 0.15);
    const textX = size / 2;
    const textY = size / 2;

    // Create SVG with text
    const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <text x="${textX}" y="${textY}" 
            font-family="Arial, sans-serif" 
            font-size="${fontSize}" 
            font-weight="bold" 
            fill="${textColor}" 
            text-anchor="middle" 
            dominant-baseline="middle">
        ${text}
      </text>
    </svg>
  `;

    const outputPath = path.join(assetsDir, name);

    await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);

    console.log(`✓ Created ${name} (${size}x${size})`);
}

async function generateAssets() {
    console.log('Generating placeholder assets...\n');

    const assets = [
        { name: 'icon.png', size: 1024, text: 'AI', bgColor: '#1A73E8' },
        { name: 'splash.png', size: 1242, text: 'AI Video', bgColor: '#FFFFFF', textColor: '#1A73E8' },
        { name: 'adaptive-icon.png', size: 1024, text: 'AI', bgColor: '#1A73E8' },
        { name: 'favicon.png', size: 48, text: 'AI', bgColor: '#1A73E8' },
    ];

    for (const asset of assets) {
        await createPNGAsset(
            asset.name,
            asset.size,
            asset.text,
            asset.bgColor,
            asset.textColor || '#FFFFFF'
        );
    }

    console.log('\n✅ All assets generated successfully!');
    console.log('💡 For production, replace these with your custom designs.');
}

generateAssets().catch(console.error);
