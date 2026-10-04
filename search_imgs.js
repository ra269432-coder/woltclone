const https = require('https');

function search(q) {
  return new Promise((res, rej) => {
    const url = 'https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&generator=search&gsrsearch=' + encodeURIComponent(q) + '&gsrnamespace=6&format=json&gsrlimit=15';
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (r) => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => {
        try {
          const pages = JSON.parse(d).query?.pages;
          if (pages) {
            const imgs = Object.values(pages)
              .filter(p => p.title && p.title.match(/\.(jpg|jpeg|JPG)$/) && p.imageinfo && p.imageinfo[0])
              .map(p => ({ title: p.title, url: p.imageinfo[0].url }));
            res(imgs);
          } else res([]);
        } catch(e) { res([]); }
      });
    }).on('error', rej);
  });
}

async function main() {
  const mobile_clinic = await search('mobile clinic Bangladesh');
  const maternal = await search('maternal health Bangladesh');
  const hospital = await search('hospital Bangladesh');
  const health_worker = await search('health worker training Bangladesh');
  
  console.log('=== MOBILE CLINIC ===');
  mobile_clinic.slice(0, 5).forEach(i => console.log(i.url));
  console.log('=== MATERNAL ===');
  maternal.slice(0, 5).forEach(i => console.log(i.url));
  console.log('=== HOSPITAL ===');
  hospital.slice(0, 5).forEach(i => console.log(i.url));
  console.log('=== HEALTH WORKER ===');
  health_worker.slice(0, 5).forEach(i => console.log(i.url));
}

main().catch(console.error);
