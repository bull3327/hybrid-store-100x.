
export const generateAffiliateLink = (url: string | null, platform: string) => {
    if (!url) return '#';

    // Check if tag is already present (Logic updated to allow override)
    // if (url.includes('tag=') || url.includes('id=')) return url;

    const amazonTag = process.env.AMAZON_PARTNER_TAG;
    const walmartId = process.env.WALMART_IMPACT_ID;

    try {
        const urlObj = new URL(url);

        if (platform === 'AMAZON' && amazonTag) {
            urlObj.searchParams.set('tag', amazonTag);
            return urlObj.toString();
        }

        // Walmart often uses Impact Radius links, which are structurally different.
        // If it's a direct walmart.com link, we might convert it, but usually you paste the FULL impact link in DB.
        // If it is a generic link, we append.
        if (platform === 'WALMART' && walmartId) {
            // Walmart affiliate logic is complex (often requires generating a specific tracking link).
            // Assuming the user puts the BASE affiliate link in the DB, we might just return it.
            return url;
        }

        return url;
    } catch (e) {
        return url;
    }
}
