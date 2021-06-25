const express = require('express');
const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success', 'Successfully created new review!');
    res.redirect(`/campgrounds/${camp._id}`);

}


module.exports.deleteReview = async(req, res) => {

    const { id, reviewId } = req.params;

    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    //pull operator -> remove de um array todos que batem em uma condição
    req.flash('success', 'Successfully deleted review!');
    res.redirect(`/campgrounds/${id}`);
}