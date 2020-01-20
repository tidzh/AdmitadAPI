const express = require("express"),
  router = express.Router(),
  admitadApi = require('../AdmitadApi');


router.get('/websites', (req, res) => {
  (async () => {
	const websites = await admitadApi.getWebsites();
	res.send(websites);
  })()
});
router.get('/websites/advcampaigns/', (req, res) => {
  (async () => {
	const advcampaigns = await admitadApi.getAdvCampaigns(602559); // w_id - это идентификатор площадки.
	res.send(advcampaigns);
  })()
});
module.exports = router;