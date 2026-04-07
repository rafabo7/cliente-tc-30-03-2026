// mockFetch.js
// Mock fetch function that returns the same data for any user/album id using regex

const MOCK_FAIL_PROB = 0.3

async function mockFetch(url) {
  // Simulate random failure
  if (Math.random() < MOCK_FAIL_PROB) {
    return {
      ok: false,
      status: 500,
      json: async () => ({ error: 'Random mock failure' })
    }
  }
  if (/\/users\/\d+$/.test(url)) {
    return {
      ok: true,
      json: async () => ({ id: 1, name: 'Leanne Graham' })
    }
  }
  if (/\/users\/\d+\/albums$/.test(url)) {
    return {
      ok: true,
      json: async () => ([
        { id: 101, title: 'quidem molestiae enim' },
        { id: 102, title: 'sunt qui excepturi placeat culpa' }
      ])
    }
  }
  if (/\/albums\/\d+\/photos$/.test(url)) {
    return {
      ok: true,
      json: async () => ([
        { title: 'accusamus beatae ad facilis cum similique qui sunt' },
        { title: 'reprehenderit est deserunt velit ipsam' }
      ])
    }
  }
  // Default fallback
  return { ok: false, status: 404, json: async () => ({}) }
}

export default mockFetch;
