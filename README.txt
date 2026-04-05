RBT Defense Tool - hosted link version

Why this exists:
- iPhone does not reliably run JavaScript from raw .html files opened out of WhatsApp or Files.
- To make the app work when a user taps your WhatsApp message, share a normal HTTPS link to this folder after it is hosted.

Files:
- index.html: main app
- manifest.webmanifest: install metadata for Add to Home Screen
- sw.js: offline caching after first load
- icon.svg: app icon

What users should do:
1. Tap the hosted link from WhatsApp.
2. The app opens in the browser and works immediately.
3. Optional: Share -> Add to Home Screen for app-like access.
4. After the first successful load, it can keep working offline from the home screen/browser cache.

Important:
- Sending the raw HTML file itself will still break on iPhone.
- Share the hosted URL, not the file attachment.
