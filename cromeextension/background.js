// chrome.runtime.onMessage.addListener(async (message,sender,sendResponse)=>{

//     chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
//         let url = tabs[0].url;
//         if(url.startsWith("https://www.youtube.com/watch?v=")){

//             try{
//                 const response = await fetch('http://127.0.0.1:5000/summarize?url='+url);
//                 const response_json = await response.json();
//                 sendResponse({summary: json.summary}); 
//             }
//             catch(error){
//                 console.error("Error fetching summary:");
//                 sendResponse({summary: "Error for fetching summary"})
//             }
//         }
//         else{
//             sendResponse("Please open a youtube video and try again...");
//         }
//     });

//     return true;
// })
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Check the active tab URL and fetch summary if it's a YouTube video
    chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
        let url = tabs[0].url;
        if (url.startsWith("https://www.youtube.com/watch?v=")) {
            try {
                const response = await fetch("http://127.0.0.1:5000/summarize?url=" + url);
                // const json = await response.json();
                // console.log(json);
                // sendResponse({summary: json.summary});
                // Check if the response is JSON
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const json = await response.json();
                    console.log(json);
                    sendResponse({ summary: json.summary });
                } else {
                    console.error("Response is not JSON");
                    const text = await response.text();
                    console.error("Received HTML:", text);
                    sendResponse({ summary: "Error: Received non-JSON response from server." });
                }
            } catch (error) {
                console.error("Error fetching summary:", error);
                sendResponse({summary: "Error fetching summary"});
            }
        } else {
            sendResponse({summary: "Please open a YouTube video and try again..."});
        }
    });

    // Indicate that the response will be sent asynchronously
    return true;
});
