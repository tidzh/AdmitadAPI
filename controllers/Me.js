const constants = require('../config');

const express = require("express"),
  router = express.Router();

const AdmitadApi = require('../AdmitadApi');
const api = new AdmitadApi(constants.client_id, constants.client_secret);

router.get('/me', (req, res) => {
  (async () => {
	const profile = await api.getProfile();
	res.send(profile);
  })()
});
module.exports = router;