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
        file.close(); fs.unlinkSync(dest);
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close(); fs.unlinkSync(dest);
        reject(new Error('Status: ' + res.statusCode + ' for ' + cleanUrl));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('OK:', dest); resolve(); });
    }).on('error', e => { try { fs.unlinkSync(dest); } catch(_) {} reject(e); });
  });
}

async function main() {
  const items = [
    {
      // Assistive Technology: Wheelchair distribution to persons with disabilities, Jamalpur Bangladesh
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Md_Faridul_Haque_Khan_distributes_wheelchairs_to_persons_with_disabilities_Jamalpur_Government_Girls%27_High_School_2021-12-06_%28PID-0025975%29.jpg',
      dest: 'public/images/disability_assistive.jpg',
      name: 'Assistive Technology - Wheelchair Distribution Bangladesh'
    },
    {
      // Inclusive Education: Inclusive Education Roundtable, Dhaka Bangladesh 2025
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Bidhan_Ranjan_Roy_Poddar_Roundtable_Meeting_Inclusive_Education_Dhaka_2025-07-08_%28PID-0001034%29.jpg',
      dest: 'public/images/disability_education.jpg',
      name: 'Inclusive Education Roundtable Dhaka'
    },
    {
      // Vocational Rehab: Helping Khaleda - Rana Plaza survivor getting sewing/vocational support, Bangladesh
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Helping_Khaleda%2C_one_of_the_survivors_of_Rana_Plaza_%2814008308964%29.jpg',
      dest: 'public/images/disability_vocational.jpg',
      name: 'Vocational Rehab - Rana Plaza survivor Bangladesh'
    },
    {
      // Rights & Advocacy: Rehabilitation program for disabled children, Korail Slum, Dhaka
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/2026-05-14_Zubaida_Rahman_inspecting_health_and_rehabilitation_services_for_disabled_children_at_Ershad_Field%2C_Korail_slum%2C_Mohakhali%2C_Dhaka.jpg',
      dest: 'public/images/disability_advocacy.jpg',
      name: 'Disability Rehab Services, Korail Slum, Dhaka'
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
