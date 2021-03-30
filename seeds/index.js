const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    const price = Math.floor(Math.random() * 20) + 10
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '604f6442f1988522b0f8d0bb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, voluptate?',
            price,
            geometry: {
                "coordinates": [cities[random1000].longitude, cities[random1000].latitude],
                "type": "Point"
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/manav-06/image/upload/v1616728343/sezwqwng9e5aabqbytzz.png',
                    filename: 'YelpCamp/dzvbdncnosmfsybpt4hm'
                },
                {
                    url: 'https://res.cloudinary.com/manav-06/image/upload/v1616677599/sample.jpg',
                    filename: 'YelpCamp/rhx5jb9xb1ggjfqvykbt'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})