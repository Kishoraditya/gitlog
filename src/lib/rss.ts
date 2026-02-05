/**
 * RSS Feed Generator Utility
 */

export interface RssItem {
    title: string;
    description: string;
    link: string;
    date: string;
    author?: string;
}

export function generateRssXml(title: string, description: string, siteUrl: string, items: RssItem[]) {
    const rssItems = items
        .map((item) => `
        <item>
            <title><![CDATA[${item.title}]]></title>
            <link>${siteUrl}${item.link}</link>
            <description><![CDATA[${item.description}]]></description>
            <pubDate>${new Date(item.date).toUTCString()}</pubDate>
            <guid isPermaLink="true">${siteUrl}${item.link}</guid>
            ${item.author ? `<dc:creator><![CDATA[${item.author}]]></dc:creator>` : ""}
        </item>`)
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:wfw="http://wellformedweb.org/CommentAPI/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
    xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
    <channel>
        <title>${title}</title>
        <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
        <link>${siteUrl}</link>
        <description>${description}</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <language>en-US</language>
        <sy:updatePeriod>hourly</sy:updatePeriod>
        <sy:updateFrequency>1</sy:updateFrequency>
        ${rssItems}
    </channel>
</rss>`;
}
