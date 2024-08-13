import Url from '../models/Url.js';
import Clicks from '../models/Clicks.js';
import uap from 'ua-parser-js';
import asyncHandler from '../middleware/asyncHandler.js';

const storeUrlClicks = asyncHandler(async (req, res) => {
  const { shortenurl } = req.params;

  const url = await Url.findOne({ shortenUrlId: shortenurl });

  let deviceInfo = uap(req.headers['user-agent']);

  const device = deviceInfo.type || 'desktop'; // Default to desktop if type is not detected

  const response = await fetch('https://ipapi.co/json');

  if (url && response) {
    const { city, country_name: country } = await response.json();

    await Clicks.create({
      url: url._id,
      city: city,
      country: country,
      device: device,
    });

    res.redirect(url.originalUrl);
  } else {
    res.status(404);
    throw new Error('Url is not found');
  }
});

const getUrlClicks = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const totalClicks = await Clicks.find({ url: id });

  if (totalClicks) {
    res.json(totalClicks);
  } else {
    res.status(404);
    throw new Error('Stats is not found');
  }
});

export { storeUrlClicks, getUrlClicks };
