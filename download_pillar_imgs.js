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
      // Social Development: Education for underprivileged women, Korail slum, Dhaka, Bangladesh
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/BBLT_II_Education_for_underprivileged_woman.jpg',
      dest: 'public/images/pillar_social.jpg',
      name: 'Social Development - Education for underprivileged women, Korail Slum Dhaka'
    },
    {
      // Humanitarian Response: WFP relief supplies near Bangladeshi Cyclone Sidr survivors 2007
      // Already downloaded as disaster_relief.jpg - copy it
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/US_Navy_071203-N-1831S-159_Boxes_of_relief_supplies_are_piled_near_Bangladeshi_citizens_affected_by_Tropical_Cyclone_Sidr.jpg',
      dest: 'public/images/pillar_humanitarian.jpg',
      name: 'Humanitarian Response - WFP relief boxes Cyclone Sidr Bangladesh'
    },
    {
      // Social Enterprise: Bangladeshi woman weaving cloth on a hand loom
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Bangalee_woman_weaving_cloth_with_a_hand_made_weaver.jpg',
      dest: 'public/images/pillar_enterprise.jpg',
      name: 'Social Enterprise - Bangladeshi woman weaving on hand loom'
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
