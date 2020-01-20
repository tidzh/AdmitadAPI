const express = require("express"),
  router = express.Router(),
  admitadApi = require('../AdmitadApi');

router.get('/me', (req, res) => {
  (async () => {
	const profile = await admitadApi.getProfile();
	res.send(profile);
  })()
});
module.exports = router;