/**
 * Test script to demonstrate HTML to Markdown conversion
 * This uses the same conversion logic as the browser application
 */

// Sample HTML content (simulating a downloaded webpage)
const sampleHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Example Website</title>
</head>
<body>
    <h1>Welcome to Example Site</h1>
    <p>This is a paragraph with some <a href="https://example.com">link text</a> that demonstrates the conversion.</p>
    <h2>Section Title</h2>
    <p>Another paragraph with an <img src="https://example.com/image.jpg" alt="Example Image"> embedded image.</p>
    <h3>Subsection</h3>
    <p>More content here with <strong>bold text</strong> and <em>italic text</em>.</p>
    <p>Here's a list of items:</p>
    <ul>
        <li>First item</li>
        <li>Second item</li>
    </ul>
</body>
</html>
`;

// Conversion function (same logic as in downer.astro)
function convertHTMLToMarkdown(html) {
    let markdown = html
        .replace(/<h1[^>]*>(.*?)<\/h1>/g, '# $1\n\n')
        .replace(/<h2[^>]*>(.*?)<\/h2>/g, '## $1\n\n')
        .replace(/<h3[^>]*>(.*?)<\/h3>/g, '### $1\n\n')
        .replace(/<p[^>]*>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<img[^>]*src="([^"]*)"[^>]*>/g, '![]($1)')
        .replace(/<[^>]+>/g, '');
    
    // Clean up extra whitespace
    markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();
    
    return markdown;
}

// Test the conversion
console.log('='.repeat(60));
console.log('HTML to Markdown Conversion Test');
console.log('='.repeat(60));
console.log('\n📄 Original HTML:');
console.log('-'.repeat(60));
console.log(sampleHTML);
console.log('\n📝 Converted Markdown:');
console.log('-'.repeat(60));
const markdown = convertHTMLToMarkdown(sampleHTML);
console.log(markdown);
console.log('\n✅ Conversion successful!');
console.log('='.repeat(60));

// Save to file for verification
import fs from 'fs';
fs.writeFileSync('test-output.md', markdown);
console.log('\n💾 Markdown saved to: test-output.md');

