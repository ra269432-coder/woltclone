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
      // Early Warning Systems: Bangladeshi locals waiting in triage before being seen by medical team
      // Bangladesh Army + US Navy medical exercise, coastal Bangladesh 2009
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/US_Navy_090801-M-2709G-179_Bangladeshi_locals_wait_in_a_triage_area_before_being_seen_by_a_team_of_Bangladesh_Army_and_U.S._Navy_medical_personnel.jpg',
      dest: 'public/images/disaster_warning.jpg',
      name: 'Early Warning - Bangladesh triage/emergency preparedness'
    },
    {
      // Emergency Relief Distribution: Relief supplies distributed to Bangladeshi citizens after Cyclone Sidr 2007
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/US_Navy_071203-N-1831S-159_Boxes_of_relief_supplies_are_piled_near_Bangladeshi_citizens_affected_by_Tropical_Cyclone_Sidr.jpg',
      dest: 'public/images/disaster_relief.jpg',
      name: 'Emergency Relief - Cyclone Sidr relief supplies, Bangladesh 2007'
    },
    {
      // Resilient Infrastructure: Father and son wading through Cyclone Aila floodwaters in Bangladesh
      // Shows the context of WHY resilient infrastructure is needed
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Father_son.JPG',
      dest: 'public/images/disaster_infrastructure.jpg',
      name: 'Infrastructure - Father and son in Cyclone Aila flood, Bangladesh 2009'
    },
    {
      // Post-Disaster Rehabilitation: Local residents helping unload aid after Cyclone Sidr, Bangladesh 2007
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/US_Navy_071203-N-5642P-299_Local_residents_assist_in_unloading_food_supplies_off_of_a_CH-53E_Super_Stallion_helicopter%2C_attached_to_Marine_Medium_Helicopter_Squadron_%28HMM%29_261.jpg',
      dest: 'public/images/disaster_rehabilitation.jpg',
      name: 'Post-Disaster Rehab - Bangladeshi residents unloading aid, Cyclone Sidr 2007'
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
