
import { fetchFromAmazon } from './amazon';
import { fetchFromAliExpress } from './aliexpress';

import { fetchFromWalmart } from './walmart';

export async function fetchProductData(url: string) {
    if (url.includes('amazon') || url.includes('amzn')) {
        return await fetchFromAmazon(url);
    } else if (url.includes('aliexpress')) {
        return await fetchFromAliExpress(url);
    } else if (url.includes('walmart')) {
        return await fetchFromWalmart(url);
    } else {
        // Generic fallback
        return await fetchFromAmazon(url);
    }
}
