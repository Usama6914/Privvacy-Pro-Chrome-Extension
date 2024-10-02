// @ts-ignore
import { privacyLayer, removePrivacyLayer } from '../Popup/Popups/popup.js'

chrome.runtime.onMessage.addListener((message) => {
    if (message.action == "blurSite") {
        removePrivacyLayer()
        privacyLayer()
    } else if (message.action == 'updateTitle') {
        // Change the title of the current tab
        document.title = message.title;
        console.log("message a gya");
    } else if (message.action == "removePrivacy") {
        removePrivacyLayer()
    }
});


