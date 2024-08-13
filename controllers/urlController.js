import Url from '../models/Url.js';
import Clicks from '../models/Clicks.js';
import validUrl from 'valid-url';
import shortid from 'shortid';
import asyncHandler from '../middleware/asyncHandler.js';

const shortenUrl = asyncHandler(async (req, res) => {
  const { title, longUrl } = req.body;

  const validateUrl = validUrl.isUri(longUrl);

  if (!validateUrl) {
    res.status(404);
    throw new Error('Enter url is not valid, please enter the correct url');
  }

  const shortenUrlId = shortid();
  const shortUrl = `${process.env.SERVER_URL}/${shortenUrlId}`;
  const url = await Url.create({
    title,
    originalUrl: longUrl,
    shortenUrl: shortUrl,
    shortenUrlId: shortenUrlId,
    user: req.user._id,
  });
  if (url) {
    res.status(201).json({
      id: url._id,
      title,
      originalUrl: url.originalUrl,
      shortenUrl: url.shortenUrl,
      shortenUrlId: url.shortenUrlId,
    });
  } else {
    res.status(500);
    throw new Error('Something went wrong, please try again');
  }
});

const redirectUrl = asyncHandler(async (req, res) => {
  const { shortenurl } = req.params;

  const url = await Url.findOne({ shortenUrlId: shortenurl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404);
    throw new Error(
      'Enter shorten url is not valid, please enter the correct url'
    );
  }
});

const getUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ user: req?.user?._id });

  if (urls) {
    res.json(urls);
  } else {
    res.status(404);
    throw new Error('Urls are empty');
  }
});

const getUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const url = await Url.findOne({ _id: id });

  if (url) {
    res.json(url);
  } else {
    res.status(404);
    throw new Error('Url is not found');
  }
});

const deleteUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteUrl = await Url.findByIdAndDelete(id);
  const deleteUrlClicks = await Clicks.deleteMany({
    url: { $in: [id] },
  });

  if (deleteUrl) {
    if (deleteUrlClicks) {
      res.json(deleteUrl);
    } else {
      res.status(404);
      throw new Error('Something went wrong, while deleting the url clicks');
    }
  } else {
    res.status(404);
    throw new Error('Url is not found');
  }
});

export { shortenUrl, redirectUrl, getUrls, getUrl, deleteUrl };
