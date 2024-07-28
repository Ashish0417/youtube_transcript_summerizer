// const loader = document.getElementById('loader');

// const btn = document.getElementById('summarize_btn');

// btn.addEventListener('click', () => {
//     loader.style.display = 'block';
//     chrome.runtime.sendMessage('hi', (response) => {
//         btn.innerHTML = 'summarize...';
        
//         if (chrome.runtime.lastError) {
//             console.error(chrome.runtime.lastError.message);
//         } else {
//             document.getElementById('output').innerHTML=response.summary
//         }
//     });
//     loader.style.display = 'none';
// });
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const btn = document.getElementById('summarize_btn');
  
    btn.addEventListener('click', () => {
      // Show the loader
      loader.style.display = 'block';
      btn.style.display='none';
  
      chrome.runtime.sendMessage('hi', (response) => {
        // Hide the loader after the response is received
        loader.style.display = 'none';
        btn.style.display='block';
  
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else {
          document.getElementById('output').innerHTML = response.summary;
        }
      });
    });
  });
  