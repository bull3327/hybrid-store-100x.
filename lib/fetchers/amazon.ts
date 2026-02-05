
import * as cheerio from 'cheerio';

export interface ProductData {
    title: string;
    description: string;
    images: string[];
    price: number | null;
    currency: string;
    originalPrice?: number | null;
    vendor?: string;
}

export async function fetchFromAmazon(url: string): Promise<ProductData | null> {
    try {
        // In a real app with API Access:
        // if (process.env.AMAZON_ACCESS_KEY) { return fetchFromPaApi(url); }

        // Fallback: Enhanced Scraping with JSON-LD
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5'
            }
        });

        if (!res.ok) throw new Error(`Amazon fetch failed: ${res.status}`);
        const html = await res.text();
        const $ = cheerio.load(html);

        let data: ProductData = {
            title: '',
            description: '',
            images: [],
            price: null,
            currency: 'USD'
        };

        // 1. Try generic OpenGraph (Safe, standard)
        data.title = $('meta[property="og:title"]').attr('content') || $('title').text().trim();
        const ogImage = $('meta[property="og:image"]').attr('content');
        if (ogImage) data.images.push(ogImage);
        data.description = $('meta[property="og:description"]').attr('content') || '';

        // 2. Try Specific Amazon Selectors
        const titleEl = $('#productTitle').text().trim();
        if (titleEl) data.title = titleEl;

        const priceWhole = $('.a-price-whole').first().text().replace('.', '').trim();
        const priceFraction = $('.a-price-fraction').first().text().trim();
        if (priceWhole) {
            data.price = parseFloat(`${priceWhole}.${priceFraction || '00'}`);
        }

        // 3. Try JSON-LD (Best for structured data if available)
        // Amazon sometimes changes this, but it's worth a shot
        $('script[type="application/ld+json"]').each((_, el) => {
            try {
                const json = JSON.parse($(el).html() || '{}');
                if (json['@type'] === 'Product') {
                    if (json.name) data.title = json.name;
                    if (json.description) data.description = json.description;
                    if (json.image) {
                        if (Array.isArray(json.image)) data.images = json.image;
                        else if (typeof json.image === 'string') data.images = [json.image];
                    }
                    if (json.offers) {
                        const offer = Array.isArray(json.offers) ? json.offers[0] : json.offers;
                        if (offer.price) data.price = parseFloat(offer.price);
                        if (offer.priceCurrency) data.currency = offer.priceCurrency;
                    }
                }
            } catch (e) {
                // Ignore parse errors
            }
        });

        // Clean up title (remove "Amazon.com: " prefix if present)
        data.title = data.title.replace(/^Amazon\.com: /, '');

        return data;

    } catch (error) {
        console.error("Amazon Fetch Error:", error);
        return null;
    }
}
