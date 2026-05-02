
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '3gu4dx3n',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

async function debug() {
  const doc = await client.fetch(`*[_type == "menuPage"][0]`);
  console.log('BURGER CAROUSEL NAMES:', doc?.burgerCarousel?.map(i => i.name));

  const wraps = await client.fetch(`*[_type == "wrapsPage"][0]`);
  console.log('WRAPS CAROUSEL NAMES:', wraps?.wrapsCarousel?.map(i => i.name));
  
  const rice = await client.fetch(`*[_type == "riceBowlsPage"][0]`);
  console.log('RICE BOWLS NAMES:', rice?.riceBowlsCarousel?.map(i => i.name));
}

debug();
