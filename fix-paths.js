const fs = require('fs');
const path = require('path');

function fixPaths(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixPaths(filePath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Replace absolute paths with relative paths
      content = content.replace(/href="\/_next\//g, 'href="./_next/');
      content = content.replace(/src="\/_next\//g, 'src="./_next/');
      content = content.replace(/href='\/_next\//g, "href='./_next/");
      content = content.replace(/src='\/_next\//g, "src='./_next/");
      // Fix paths inside inline script tags
      content = content.replace(/\\"\/\_next\//g, '\\".\/_next/');
      content = content.replace(/\\'\/\_next\//g, "\\'./_next/");

      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed paths in: ${filePath}`);
    }
  });
}

const outDir = path.join(__dirname, 'out');
console.log('Fixing paths in output directory...');
fixPaths(outDir);
console.log('Done!');
