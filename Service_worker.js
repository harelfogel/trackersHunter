const defaultTrackers = {
  amazon_adsystem: false,
  google_analytics: false,
  facebook: false,
  twitter: false,
  youtube: false
}

const current = {
  trackers: defaultTrackers,
  website: ''
}

const history = {
  amazon_adsystem: [],
  google_analytics: [],
  facebook: [],
  twitter: [],
  youtube: []
}

const appendHistoryTrackers = (website, trackers) => {
  for (const tracks in history) {
    if (trackers[tracks]) {
      history[tracks].push(website);
      history[tracks] = [...new Set(history[tracks])]
    }
  }
}

const addTrackers = (website, trackers) => {
  current.trackers = trackers;
  current.website = website;
  appendHistoryTrackers(website, trackers)
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  const { context, website, trackers } = req
  if (context === 'getTrackers') {
    sendResponse({ history, current })
  } else if (context === 'addTrackers') {
    console.log('track meeeeee');
    addTrackers(website, trackers)
  }
})
