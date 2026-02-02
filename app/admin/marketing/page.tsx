
import { VideoGenerator } from '@/components/admin/VideoGenerator';

export default function MarketingPage() {
    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Ad Generator</h1>
                <p className="text-muted-foreground">
                    Create viral-ready TikTok & YouTube Shorts ads for your products instantly for Facebook Ads.
                </p>
            </div>

            <VideoGenerator />
        </div>
    )
}
