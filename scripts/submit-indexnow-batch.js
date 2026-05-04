
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { seoData } from '../src/data/seoData.js';

const DOMAIN = 'https://math.lego-sia.com';
const BING_KEY = 'bbd0d9a6843c450eb3e9d811a0fd504a';
const NAVER_KEY = '7c007da9c90cef3f9485956806191b31';

const INDEXNOW_CONFIG = [
  { endpoint: 'https://www.bing.com/indexnow', key: BING_KEY },
  { endpoint: 'https://api.indexnow.org/indexnow', key: BING_KEY },
  { endpoint: 'https://searchadvisor.naver.com/indexnow', key: NAVER_KEY }
];

const submitBatch = async () => {
  const host = new URL(DOMAIN).hostname;
  const urlList = seoData.map(route => `${DOMAIN}${route.path}`);
  
  console.log(`🚀 Submitting ${urlList.length} URLs to IndexNow (Batch Mode)...`);

  for (const config of INDEXNOW_CONFIG) {
    const { endpoint, key } = config;
    const endpointHost = new URL(endpoint).hostname;
    
    console.log(`📡 Sending POST to ${endpointHost}...`);
    
    const payload = {
      host: host,
      key: key,
      keyLocation: `${DOMAIN}/${key}.txt`,
      urlList: urlList
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'Mozilla/5.0 (compatible; IndexNow/1.0; +https://www.indexnow.org/)'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`✅ [${endpointHost}] Batch submission successful (${response.status})`);
      } else {
        const text = await response.text();
        console.error(`❌ [${endpointHost}] Failed (${response.status}): ${text}`);
      }
    } catch (error) {
      console.error(`❌ [${endpointHost}] Error:`, error.message);
    }
  }
};

submitBatch();
