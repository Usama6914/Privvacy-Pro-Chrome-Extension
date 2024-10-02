chrome.runtime.onMessage.addListener((message: any) => {
    const { tabName, action } = message;

    // Helper function to extract hostName from tab URL
    const extractHostName = (url: string): string => {
        const urlObj = new URL(url);
        const siteUrl = urlObj.hostname.split('.');
        if (siteUrl[0] === "www") siteUrl.shift();
        siteUrl.pop();
        return siteUrl.join('.');
    };

    // Fetch saved URLs once and reuse them
    chrome.storage.local.get(['urls'], (result) => {
        const savedUrls: string[] = result.urls || [];
        chrome.tabs.query({}, (tabs: chrome.tabs.Tab[]) => {
            tabs.forEach(tab => {
                if (!tab.url) return; // Skip if no URL

                function messageSend(tabId: number, action: any, title?: any) {
                    const message: { action: any; title?: any } = { action };  // Define message with optional 'title'

                    if (title !== undefined) {
                        message.title = title;  // Safely add title if it's provided
                    }
                    chrome.tabs.sendMessage(tabId, { message })
                }

                const hostName = extractHostName(tab.url);

                switch (action) {
                    case "apply Privacy to all":
                        messageSend(tab.id!, 'updateTitle', tabName)
                        break;
                    case "apply Privacy to selective":
                        if (savedUrls.some(url => url.includes(hostName))) {
                            messageSend(tab.id!, 'updateTitle', tabName)
                        }
                        break;
                    case "apply Privacy to all sites":
                        messageSend(tab.id!, 'blurSite')
                        break;
                    case "apply Privacy to selective sites":
                        if (savedUrls.some(url => url.includes(hostName))) {
                            messageSend(tab.id!, 'blurSite')
                        }
                        break;
                    case "removePrivacy":
                        messageSend(tab.id!, 'removePrivacy')
                        break;
                    default:
                        break;
                }




            });
        });
    });
});
