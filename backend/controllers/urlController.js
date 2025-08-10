const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');
const isValidUrl = require('../utils/validateUrl');

// POST /api/shorten
exports.createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) return res.status(400).json({ message: 'URL is required' });
        if (!isValidUrl(url)) return res.status(400).json({ message: 'Please provide a valid URL' });

        let existingUrl = await Url.findOne({ originalUrl: url });
        if (existingUrl) {
            return res.json({
                originalUrl: existingUrl.originalUrl,
                shortCode: existingUrl.shortCode,
                shortUrl: `${req.protocol}://${req.get('host')}/${existingUrl.shortCode}`
            });
        }

        let shortCode;
        let isUnique = false;
        let attempts = 0;
        const maxAttempts = 10;

        while (!isUnique && attempts < maxAttempts) {
            shortCode = generateShortCode();
            const existing = await Url.findOne({ shortCode });
            if (!existing) isUnique = true;
            attempts++;
        }

        if (!isUnique) return res.status(500).json({ message: 'Failed to generate unique short code' });

        const newUrl = new Url({ originalUrl: url, shortCode });
        await newUrl.save();

        res.status(201).json({
            originalUrl: newUrl.originalUrl,
            shortCode: newUrl.shortCode,
            shortUrl: `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`,
            createdAt: newUrl.createdAt
        });

    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /:shortcode
exports.redirectToOriginal = async (req, res) => {
    try {
        const { shortcode } = req.params;
        const url = await Url.findOne({ shortCode: shortcode });

        if (!url) return res.status(404).json({ message: 'Short URL not found' });

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/admin/urls
exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find({})
            .sort({ createdAt: -1 })
            .select('originalUrl shortCode clicks createdAt');
        res.json(urls);
    } catch (error) {
        console.error('Error fetching URLs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/stats/:shortcode
exports.getUrlStats = async (req, res) => {
    try {
        const { shortcode } = req.params;
        const url = await Url.findOne({ shortCode: shortcode });

        if (!url) return res.status(404).json({ message: 'Short URL not found' });

        res.json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET /api/stats
exports.getOverallStats = async (req, res) => {
    try {
        const totalUrls = await Url.countDocuments();
        const totalClicks = await Url.aggregate([{ $group: { _id: null, total: { $sum: '$clicks' } } }]);
        const topUrls = await Url.find({})
            .sort({ clicks: -1 })
            .limit(10)
            .select('originalUrl shortCode clicks');

        res.json({
            totalUrls,
            totalClicks: totalClicks[0]?.total || 0,
            topUrls
        });
    } catch (error) {
        console.error('Error fetching overall stats:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
