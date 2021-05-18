const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const Campground = require('../models/campground');

// router.get('/', async (req,res) => {
//   const campgrounds = await Campground.find({});
//   res.render('campgrounds/index' , {campgrounds});
// })
//
// router.get('/new', isLoggedIn, (req,res) => {
//   res.render('campgrounds/new');
// })
//
// router.post('/', isLoggedIn, catchAsync(async (req,res,next) => {
// const campground = new Campground({title: req.body.title, location: req.body.location,
// description: req.body.description, image:req.body.image, price: req.body.price})
// campground.author = req.user._id;
// await campground.save();
// req.flash('success', 'Made a New Campground');
// res.redirect(`/campgrounds/${campground._id}`);
// }))
//
// router.get('/:id', catchAsync(async (req,res)=>{
//   const campground = await Campground.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//   if (!campground) {
//        req.flash('error', 'Cannot find that campground!');
//        return res.redirect('/campgrounds');
//    }
//   res.render('campgrounds/show', {campground});
// }));
//
// router.get('/:id/edit', isLoggedIn, isAuthor, async(req,res) => {
//   const campground = await Campground.findById(req.params.id);
//   if (!campground) {
//         req.flash('error', 'Cannot find that campground!');
//         return res.redirect('/campgrounds');
//     }
//   res.render('campgrounds/edit', {campground});
// })
//
// router.put('/:id', isLoggedIn, isAuthor, async(req,res) => {
//   const campground = await Campground.findByIdAndUpdate(req.params.id, {title: req.body.title, location: req.body.location,
//   description: req.body.description, image:req.body.image, price: req.body.price});
//   req.flash('success', 'Successfully updated campground!');
//   res.redirect(`/campgrounds/${campground._id}`);
// })
//
// router.delete('/:id', isLoggedIn, isAuthor, async(req,res) => {
//   const campground = await Campground.findByIdAndDelete(req.params.id);
//   req.flash('success', 'Successfully deleted campground')
//   res.redirect('/campgrounds');
// })

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, catchAsync(campgrounds.createCampground))

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;
