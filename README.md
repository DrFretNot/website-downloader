# SiteDowner - Website Downloader & HTML to Markdown Converter

A browser-based tool that downloads web pages and converts HTML content to Markdown format. All processing happens locally in your browser using IndexedDB for storage - your data never leaves your device.

## Features

- **Single Page Download**: Download individual web pages as HTML
- **Whole Site Crawling**: Download multiple pages from a website (up to 5 pages)
- **Batch URL Download**: Download up to 50 unconnected URLs from different websites in one batch
- **HTML to Markdown Conversion**: Convert downloaded HTML files to clean Markdown format
- **Local Storage**: All files stored in your browser's IndexedDB (no server uploads)
- **File Management**: View, download, and delete downloaded files
- **Progress Tracking**: Real-time progress bar for batch downloads
- **Privacy-First**: All processing happens client-side - no data is sent to external servers except for fetching the target website via CORS proxy

## Prerequisites

- **Node.js**: Version 20.17.0 or higher (or Node 22.9.0+)
- **npm**: Version 9.6.5 or higher
- A modern web browser with IndexedDB support (Chrome, Firefox, Edge, Safari)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/badnotes/website-downloader.git
cd website-downloader
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:4321/downer
```

## How to Use

### Step 1: Download Web Pages

1. Navigate to the `/downer` page in your browser
2. Choose your download option:
   - **Single Page**: Downloads just the URL you enter
   - **Whole Site**: Crawls the website and downloads up to 5 linked pages
   - **Batch URLs**: Download up to 50 unconnected URLs from different websites
3. Enter your URL(s):
   - **Single Page/Whole Site**: Enter the website URL in the input field (e.g., `example.com` or `https://example.com`)
   - **Batch URLs**: Enter multiple URLs in the textarea, one per line (up to 50 URLs)
4. Click the **"Start Download"** button
5. The page(s) will be fetched and stored in your browser's IndexedDB
6. Downloaded files will appear in the "Downloaded Files" section

**Batch Download Example:**

```
https://example.com/article1
https://example.com/article2
https://another-site.com/blog/post
https://news-site.com/story
```

**Note**: The application uses a CORS proxy (`api.allorigins.win`) to fetch web pages. Some websites may block this proxy or require authentication. Batch downloads process URLs sequentially with small delays to be respectful to the proxy service.

### Step 2: Convert HTML to Markdown

1. After downloading one or more HTML files, click the **"Convert to Markdown"** button
2. Confirm the conversion when prompted
3. The application will convert all HTML files to Markdown format
4. Markdown files will appear alongside the original HTML files in the file list

**Conversion Process**:

- Headings (`<h1>`, `<h2>`, `<h3>`) → Markdown headings (`#`, `##`, `###`)
- Paragraphs (`<p>`) → Plain text with line breaks
- Links (`<a>`) → Markdown links `[text](url)`
- Images (`<img>`) → Markdown images `![](url)`
- All other HTML tags are stripped

### Step 3: Download Files to Your Computer

1. Check the boxes next to the files you want to download
2. Click the **"Save Files"** button
3. Files will be downloaded to your default download folder

### Step 4: Manage Files

- **View Files**: All downloaded files are listed with their URLs and timestamps
- **Delete Individual Files**: Click the trash icon next to any file
- **Clear All Files**: Click the **"Clear All"** button to remove all downloaded files from IndexedDB

## Technical Details

### Storage

- Files are stored in the browser's IndexedDB database (`WebsiteDownloaderDB`)
- Data persists across browser sessions
- To clear all data, use the "Clear All" button or clear your browser's IndexedDB

### Limitations

- **Single Page Mode**: Downloads one page at a time
- **Whole Site Mode**: Limited to 5 pages maximum
- **Batch URLs Mode**: Limited to 50 URLs maximum per batch
- **CORS Proxy**: Uses `api.allorigins.win` which may be rate-limited or blocked by some sites
- **Browser Storage**: Limited by browser's IndexedDB quota (typically 50MB-1GB depending on browser)
- **Conversion Quality**: Basic regex-based conversion - complex layouts may require manual editing
- **Batch Download Speed**: URLs are downloaded sequentially (not in parallel) to avoid overwhelming the proxy service

### Supported Websites

Works with most publicly accessible websites. May not work with:

- Sites that require authentication
- Sites that block CORS proxies
- Sites with aggressive bot protection
- Sites that require JavaScript to render content (the proxy fetches raw HTML only)

## Testing the Conversion

A test script is included to demonstrate the HTML-to-Markdown conversion:

```bash
node test-conversion.js
```

This will:

1. Convert a sample HTML file to Markdown
2. Display the results in the console
3. Save the output to `test-output.md`

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Project Structure

```
website-downloader/
├── src/
│   ├── pages/
│   │   ├── index.astro      # Landing page
│   │   └── downer.astro     # Main download/convert interface
│   ├── components/          # Reusable Astro components
│   ├── layouts/             # Page layouts
│   └── styles/              # Global styles
├── public/                  # Static assets
└── astro.config.mjs         # Astro configuration
```

## Troubleshooting

### "This URL has already been downloaded"

The application prevents duplicate downloads. Clear the file list if you want to re-download a URL.

### Download fails

- Check that the URL is accessible and doesn't require authentication
- Some websites block CORS proxies - try a different website
- Check browser console for detailed error messages

### Conversion produces poor results

The conversion uses basic regex patterns. For better results:

- Use websites with clean, semantic HTML
- Manually edit the Markdown output as needed
- Consider using a more sophisticated HTML-to-Markdown library for production use

### Files not appearing

- Check browser console for IndexedDB errors
- Ensure your browser supports IndexedDB
- Try clearing browser cache and reloading

## Browser Compatibility

- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 90+
- ✅ Safari 14+
- ❌ Internet Explorer (not supported)

## Privacy & Security

- **No Server Storage**: All files are stored locally in your browser
- **No Tracking**: No analytics or tracking of your downloads
- **CORS Proxy**: The only external request is to fetch the target website via `api.allorigins.win`
- **Local Processing**: All HTML-to-Markdown conversion happens in your browser

## License

[Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0)

Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
