const https = require('https');
const fs = require('fs');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const file = fs.createWriteStream(dest);
    https.get(cleanUrl, {
      headers: {
        'User-Agent': 'WOLT-Trust-NGO-Website/1.0 (contact@woltrust.org)',
        'Accept': 'image/jpeg,image/*',
        'Referer': 'https://commons.wikimedia.org/'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); try { fs.unlinkSync(dest); } catch(_) {}
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close(); try { fs.unlinkSync(dest); } catch(_) {}
        reject(new Error('Status: ' + res.statusCode + ' for ' + cleanUrl));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        console.log('OK:', dest, '(' + (size/1024).toFixed(1) + ' KB)');
        resolve();
      });
    }).on('error', e => { try { fs.unlinkSync(dest); } catch(_) {} reject(e); });
  });
}

async function main() {
  const items = [
    {
      // Climate Resilience: Community tree-planting in Mymensingh, Bangladesh (real NGO programme)
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Members_of_Kalibari_community_and_Mymensingh_Pourashava_help_with_demo_plot_%283683094837%29.jpg',
      dest: 'public/images/prog_climate.jpg',
      name: 'Climate Resilience - Community tree planting, Mymensingh, Bangladesh'
    },
    {
      // Bangladesh climate refugee - coastal flooding, real photo
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Bangladesh-climate_refugee.jpg',
      dest: 'public/images/prog_climate2.jpg',
      name: 'Climate - Bangladesh climate refugee coastal flood'
    }
  ];

  for (const item of items) {
    console.log('Downloading:', item.name);
    try {
      await download(item.url, item.dest);
    } catch (e) {
      console.error('FAILED:', item.name, e.message);
    }
    await sleep(3000);
  }
  console.log('All done!');
}

main();
