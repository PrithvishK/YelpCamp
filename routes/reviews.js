const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');


// router.post('/', isLoggedIn, validateReview, catchAsync(async (req,res,next) => {
//   const campground = await Campground.findById(req.params.id);
//   const review = new Review({rating: req.body.rating, review_body: req.body.review_body});
//   review.author = req.user._id;
//   campground.reviews.push(review);
//   await campground.save();
//   await review.save();
//   res.redirect(`/campgrounds/${campground._id}`);
// }))
//
// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/campgrounds/${id}`);
// }))

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;
