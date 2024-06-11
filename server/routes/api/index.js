const router = require('express').Router();
// Import your user controllers here

// Example user route
router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

module.exports = router;
