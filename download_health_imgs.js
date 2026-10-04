const https = require('https');
const fs = require('fs');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
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
        reject(new Error('Status: ' + res.statusCode));
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('OK:', dest); resolve(); });
    }).on('error', e => { try { fs.unlinkSync(dest); } catch(_) {} reject(e); });
  });
}

async function main() {
  // Real Bangladesh nurse treating patient in Cox's Bazar Rohingya camp - no building name, field setting
  await download(
    'https://upload.wikimedia.org/wikipedia/commons/c/cb/A_Bangladeshi_nurse_helps_treat_a_patient_suspected_of_suffering_from_diphtheria_in_the_Kutupalong_Rohingya_refugee_camp_near_Cox%27s_Bazar%2C_Bangladesh%2C_January_2018_%2828246596039%29.jpg',
    'public/images/health_mobile_clinic.jpg'
  );
  console.log('Done!');
}
main().catch(console.error);
