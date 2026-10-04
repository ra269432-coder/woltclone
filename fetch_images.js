const https = require('https');
https.get('https://html.duckduckgo.com/html/?q=bangladesh+village+health+worker+counseling', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = [...data.matchAll(/<img[^>]+src="([^">]+)"/g)];
    console.log(matches.map(m => m[1]).slice(0, 10));
  });
});
