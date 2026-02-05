
import * as cheerio from 'cheerio';
import { ProductData } from './amazon'; // reusing interface

export async function fetchFromAliExpress(url: string): Promise<ProductData | null> {
    try {
        // API NOTE: To use official API, you need a Registered Developer Account.
        // It requires OAuth. For this demo, we use a smart scraping method.

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            }
        });

        if (!res.ok) throw new Error(`AliExpress fetch failed: ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);

        let data: ProductData = {
            title: $('meta[property="og:title"]').attr('content') || $('title').text(),
            description: '',
            images: [],
            price: null,
            currency: 'USD'
        };

        const ogImage = $('meta[property="og:image"]').attr('content');
        if (ogImage) data.images.push(ogImage);

        // AliExpress is notorious for hiding data in "window.runParams" script
        $('script').each((_, el) => {
            const content = $(el).html() || '';
            if (content.includes('window.runParams')) {
                // This is complex regex parsing, often fragile.
                // We stick to metadata for safety in this version.
            }
        });

        return data;
    } catch (e) {
        console.error(e);
        return null;
    }
}
