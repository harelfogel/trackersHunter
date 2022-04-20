window.onload = () => {
    const trackersScripts = document.getElementsByTagName("script") // Get all possible trackers by script
    const trackers = {} // send trackers object to addTrackers context
    for (let i = 0; i < trackersScripts.length; ++i) {
        if (trackersScripts[i].src.includes('c.amazon-adsystem.com'))
            trackers.amazon_adsystem = true
        if (trackersScripts[i].src.includes('www.google-analytics.com'))
            console.log('im here');
            trackers.google_analytics = true
        if (trackersScripts[i].src.includes('connect.facebook.net'))
            trackers.facebook = true
        if (trackersScripts[i].src.includes('platform.twitter.com'))
            trackers.twitter = true
        if (trackersScripts[i].src.includes('www.youtube.com'))
            trackers.youtube = true
    }
    chrome.runtime.sendMessage({
        context: 'addTrackers',
        website: window.location.host,
        trackers
    })
}