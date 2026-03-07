const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: '8wg7d4jw',
    dataset: 'production',
    useCdn: false,
    token: 'sk8NV5qMOh3MPYOFfOsNSzONXre6DEc87f7PiB2PGmyqv3ZSuNNEEoChs9ieHr3UkGbz3FDqkg4z7RtHJ2qAWw9XZG8RLTtzQPhCb2fjOd457Y5qSbeYIX4XB6rVtXFLQacZv2o9SsoYXpQiZWtzFwgNvzlf1cCFk713mFeyLJhtPufnEhWN',
    apiVersion: '2021-10-21',
});

client.fetch('*[_type == "hotelRoom"]')
    .then(rooms => {
        console.log('All Hotel Rooms Slugs:');
        rooms.forEach(r => {
            console.log(`- Name: "${r.name}", Slug: [${r.slug?.current}]`);
        });
    })
    .catch(err => console.error(err));
