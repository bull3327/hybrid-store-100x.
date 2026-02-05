import * as cheerio from 'cheerio';

export async function scrapeMetadata(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        if (!res.ok) return null;

        const html = await res.text();
        const $ = cheerio.load(html);

        // Generic OpenGraph Scraping
        let title = $('meta[property="og:title"]').attr('content') || $('title').text() || 'Imported Product';
        let image = $('meta[property="og:image"]').attr('content') || $('link[rel="image_src"]').attr('href') || '/placeholder.png';
        let description = $('meta[property="og:description"]').attr('content') || '';
        let price: number | null = null;
        let currency = 'USD';

        // Platform Specifics
        if (url.includes('amazon') || url.includes('amzn')) {
            // Amazon specific selectors (fragile, but better than nothing)
            const amzTitle = $('#productTitle').text().trim();
            if (amzTitle) title = amzTitle;

            // Try to find price
            const priceWhole = $('.a-price-whole').first().text().replace('.', '').trim();
            const priceFraction = $('.a-price-fraction').first().text().trim();
            if (priceWhole) {
                price = parseFloat(`${priceWhole}.${priceFraction || '00'}`);
            }
        }

        if (url.includes('walmart')) {
            // Walmart specific selectors can be added here
            const wmTitle = $('h1').text().trim();
            if (wmTitle) title = wmTitle;
        }

        return { title, image, description, price, currency };
    } catch (e) {
        console.error("Scraping failed", e);
        return null; // Fallback to defaults
    }
}
