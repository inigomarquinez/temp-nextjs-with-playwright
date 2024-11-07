import { test, expect } from 'next/experimental/testmode/playwright'

test('pokemon', async ({ page, next }) => {
  next.onFetch((request) => {
    if (request.url === 'https://pokeapi.co/api/v2/pokemon/bulbasaur') {
      return new Response(
        JSON.stringify({
          name: 'squirtle'
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    }
    return 'abort'
  })

  await page.goto(`http://localhost:3000/`);
  const name = await page.innerText('h1');
  expect(name).toBe('squirtle');
})