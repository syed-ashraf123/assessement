const mongoose = require("mongoose");

// Define schema
const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  applianceType: String,
  averageRating: Number,
  categoryL0: String,
  categoryL1: String,
  categoryL2: String,
  code: String,
  demoFlag: Boolean,
  discount: Number,
  discountValue: String,
  finalReviewRating: Number,
  finalReviewRatingCount: Number,
  manufacturer: String,
  mrp: {
    formattedValue: String,
    priceType: String,
    value: Number,
  },
  name: String,
  plpImage: String,
  price: {
    formattedValue: String,
    priceType: String,
    value: Number,
  },
  productLiveDate: Date,
  quickViewDesc: String,
  specialSku: Boolean,
  standardWarranty: [String],
  summary: String,
  url: String,
  wiiFlag: Boolean,
  stockFlag: [String],
  relevancyScore: Number,
  rankingScore: Number,
  numberOfReviews: Number,
  numberOfRatings: Number,
  manufacturerAID: String,
  plmStatus: String,
  storeDiscountPercent: [Number],
  storeMop: [String],
});

// Create model
const smartphones = mongoose.model("smartphones", productSchema);

module.exports = smartphones;
