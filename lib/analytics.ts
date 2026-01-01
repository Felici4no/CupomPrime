type EventName =
    | "view_product"
    | "click_affiliate"
    | "create_alert"
    | "search"
    | "filter_change"
    | "sort_change";

interface EventData {
    [key: string]: any;
}

export function trackEvent(eventName: EventName, data?: EventData) {
    // For now, just log to console
    // In production, this would integrate with GA4, Meta Pixel, etc.
    console.log(`[Analytics] ${eventName}`, data);

    // Future integration example:
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('event', eventName, data);
    // }
}
