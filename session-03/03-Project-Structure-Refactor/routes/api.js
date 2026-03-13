const router = require("express").Router();

router.get("/status", (req, res) => {
  res.json({ OK: true });
});

module.exports = router;
