import mongoose from 'mongoose';

const urlSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortenUrl: {
      type: String,
      required: true,
    },
    shortenUrlId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Url = mongoose.model('Url', urlSchema);

export default Url;
