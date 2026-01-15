const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'images');
const files = fs.readdirSync(imagesDir);

console.log(`Found ${files.length} files in ${imagesDir}`);

async function convert() {
    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg')) {
            const inputPath = path.join(imagesDir, file);
            const outputPath = path.join(imagesDir, file.replace(/\.(png|jpg)$/, '.webp'));

            // specific settings for webp
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
}

convert();
