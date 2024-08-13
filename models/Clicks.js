import mongoose from 'mongoose';

const clicksSchema = mongoose.Schema(
  {
    url: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Url',
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    device: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Clicks = mongoose.model('Clicks', clicksSchema);

export default Clicks;
