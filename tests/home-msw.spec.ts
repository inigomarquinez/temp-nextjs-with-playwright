import {
  test,
  expect,
  http,
  HttpResponse,
  passthrough,
} from 'next/experimental/testmode/playwright/msw'

test.use({
  mswHandlers: [
    [
      http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
        return HttpResponse.json({
          name: 'squirtle'
        })
      }),
      // allow all non-mocked routes to pass through
      http.all('*', () => {
        return passthrough()
      }),
    ],
    { scope: 'test' }, // or 'worker'
  ],
})

test('pokemon', async ({ page, msw }) => {
  msw.use(
    http.get('https://pokeapi.co/api/v2/pokemon/bulbasaur', () => {
      return HttpResponse.json({
        name: 'squirtle'
      })
    })
  )

  await page.goto(`http://localhost:3000/`);
  const name = await page.innerText('h1');
  expect(name).toBe('squirtle');
})
