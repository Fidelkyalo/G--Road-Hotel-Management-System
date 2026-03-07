const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '8wg7d4jw',
    dataset: 'production',
    useCdn: false,
    token: 'sk8NV5qMOh3MPYOFfOsNSzONXre6DEc87f7PiB2PGmyqv3ZSuNNEEoChs9ieHr3UkGbz3FDqkg4z7RtHJ2qAWw9XZG8RLTtzQPhCb2fjOd457Y5qSbeYIX4XB6rVtXFLQacZv2o9SsoYXpQiZWtzFwgNvzlf1cCFk713mFeyLJhtPufnEhWN',
    apiVersion: '2021-10-21',
});

const slugs = ['1 Bedroom', 'Studio'];
Promise.all(slugs.map(slug =>
    client.fetch('*[_type == "hotelRoom" && slug.current == $slug][0]', { slug })
)).then(rooms => {
    rooms.forEach(r => {
        if (!r) return console.log('Room not found');
        console.log(`--- Room: ${r.name} (${r.slug.current}) ---`);
        console.log('Images:', JSON.stringify(r.images, null, 2));
    });
}).catch(err => console.error(err));
