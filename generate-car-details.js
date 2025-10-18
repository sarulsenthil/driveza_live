// Script to generate car detail pages from template
const fs = require('fs');
const path = require('path');

// Read the template
const templatePath = path.join(__dirname, 'html', 'car-detail-template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Read the car data
const dataPath = path.join(__dirname, 'data', 'cars.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Generate car detail pages
data.cars.forEach(car => {
    let html = template;
    
    // Replace title
    html = html.replace(
        '<title>Car Detail - DriveZA Motors</title>',
        `<title>${car.year} ${car.make} ${car.model} - DriveZA Motors</title>`
    );
    
    // Write the file
    const outputPath = path.join(__dirname, 'html', `car-detail-${car.id}.html`);
    fs.writeFileSync(outputPath, html);
    
    console.log(`Generated car-detail-${car.id}.html for ${car.year} ${car.make} ${car.model}`);
});

console.log('All car detail pages generated successfully!');
