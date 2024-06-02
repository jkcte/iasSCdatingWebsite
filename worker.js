addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
  
    // Check if the request is for the root or any non-existent path
    if (url.pathname === '/' || url.pathname === '/index.html') {
      // Redirect to index.html
      return fetch('https://c7e7a200.testrun-k32.pages.dev/index.html')
    }
  
    // Otherwise, fetch the requested resource
    return fetch(request)
  }
  