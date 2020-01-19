const constants = require('../config');

const express = require("express"),
  router = express.Router();

const AdmitadApi = require('../AdmitadApi');
const api = new AdmitadApi(constants.client_id, constants.client_secret);

router.get('/websites', (req, res) => {
  (async () => {
	const websites = await api.getWebsites();
	res.send(websites);
  })()
});
router.get('/websites/advcampaigns/', (req, res) => {
  (async () => {
	const advcampaigns = await api.getAdvAampaigns(602559); // w_id - это идентификатор площадки.
	res.send(advcampaigns);
  })()
});
module.exports = router;