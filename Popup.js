const trackers = {
    amazon_adsystem: 'amazon_adsystem',
    google_analytics: 'google_analytics',
    facebook: 'facebook',
    twitter: 'twitter',
    youtube: 'youtube',
}

const getWebsiteTrackers = (current) => {    
    for (const tracker in trackers) {
        console.log(tracker);
        document.getElementById(tracker).innerHTML += ` ${
        current.trackers[tracker] ? `<div style="margin-left:5px">Tracking!</div><i style="margin-left:25px;margin-top:3px" class="fa-light fa-eye"</i>` : `<div style="margin-left:23px">OK</div><i style="margin-left:23px" class="fa-regular fa-thumbs-up"></i> `
    } `
    }
}


const getHistoryTrackers = (history) => {
    for (const tracks in history) {
        const trackerID = document.getElementById(`${tracks}-history`);
        if (history[tracks].length) {
            history[tracks].forEach(value => {

                trackerID.innerHTML += `<li >${value}<br></li>`
            })
        } else {
            trackerID.innerHTML += `<li><p>No History yet!</p></li>`
        }
    }
}

const getBackground=(length)=>{
    const background=document.getElementById('wrapper');
    for(let i=1;i<=length;++i){
        let backgroundString=`<div class='light x${i}'></div>`;
        background.innerHTML+=backgroundString;
    }
}

window.onload = () => {
    getBackground(9);
    chrome.runtime.sendMessage({
                context: 'getTrackers',
            },
            (res) => {
                const { current, history } = res;
                getWebsiteTrackers(current);
                getHistoryTrackers(history);
            }
        )
        //Add onClick to buttons
    const addClickArray = document.getElementsByClassName('tracker-button')
    for (let i = 0; i < addClickArray.length; i++) {
        addClickArray[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const websiteList = this.nextElementSibling
            if (websiteList.style.display === 'block') {
                websiteList.style.display = 'none';
            } else {
                websiteList.style.display = 'block';
            }
        })
    }
}