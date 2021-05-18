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

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i =0; i < 50 ; i ++){
  const random = Math.floor(Math.random() * 1000);
  const random1 = Math.floor(Math.random() * 17);
  const random2 = Math.floor(Math.random() * 19);
  const random3 = Math.floor(Math.random()*25) + 10;
  const item = new Campground({location: `${cities[random].city} , ${cities[random].state}`,
  title:  `${descriptors[random1]}` + " " + `${places[random2]}`,
  price: random3,
  image: 'https://source.unsplash.com/collection/483251',
  author: '60934b496db8340e0865c09d',
  description: 'Iaculis at erat pellentesque adipiscing commodo elit. Nisl rhoncus mattis rhoncus urna neque viverra justo. Morbi tristique senectus et netus et malesuada fames. Tellus in hac habitasse platea dictumst vestibulum. Egestas purus viverra accumsan in nisl nisi. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Ac placerat vestibulum lectus mauris ultrices. Proin sed libero enim sed faucibus turpis. Scelerisque viverra mauris in aliquam. Ipsum nunc aliquet bibendum enim. Bibendum enim facilisis gravida neque convallis a cras. Varius quam quisque id diam vel. Condimentum vitae sapien pellentesque habitant morbi tristique'});
  await item.save()
  }
}

seedDB().then(()=>{
mongoose.connection.close();
console.log("Database Connection Closed")
});
