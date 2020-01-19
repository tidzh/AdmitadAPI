const fetch = require('node-fetch');
const ADMITAD_API_URL = 'https://api.admitad.com/';
const SCOPE = 'public_data websites manage_websites advcampaigns advcampaigns_for_website manage_advcampaigns banners landings banners_for_website payments manage_payments announcements referrals coupons coupons_for_website private_data tickets manage_tickets private_data_email private_data_phone private_data_balance validate_links deeplink_generator statistics opt_codes manage_opt_codes webmaster_retag manage_webmaster_retag broken_links manage_broken_links lost_orders manage_lost_orders broker_application manage_broker_application offline_sales offline_receipts manage_offline_receipts';

class AdmitadApi {
  constructor(clientId, clientSecret) {
	this.clientId = clientId;
	this.clientSecret = clientSecret;
  }
  
  async _getToken() {
	let data = this.clientId + ':' + this.clientSecret;
	let result = await (await fetch(ADMITAD_API_URL + 'token?grant_type=client_credentials&client_id=' + this.clientId + '&scope=' + SCOPE, {
	  method: 'POST',
	  headers: {
		Authorization: 'Basic ' + Buffer.from(data).toString('base64')
	  }
	})).json();
	if (result.error_description) {
	  console.error(result.error_description);
	  return false;
	}
	return result.access_token;
  }
  
  async _apiRequest(params) {
	if (!this.token) {
	  this.token = await this._getToken();
	}
	let url = ADMITAD_API_URL + params;
	// console.info('admitadApiRequest', new Date().toLocaleString(), url);
	let result;
	try {
	  result = await (await fetch(url, {headers: {Authorization: 'Bearer ' + this.token}})).json();
	} catch (e) {
	  console.error('admitad api error', e);
	}
	// console.info('admatadApiResult', new Date().toLocaleString());
	if (!result || result.status_code || result.error) {
	  console.error('admitad api error: ', result ? result.details : '');
	  return false;
	}
	return result;
  }
  
  async getProfile() {
	return await this._apiRequest('me/');
  }
  
  async getWebsites() {
	return await this._apiRequest('websites/');
  }
  
  async getAdvAampaigns(w_id = 602559) {
	return await this._apiRequest(`/advcampaigns/website/${w_id}/`);
  }
}

module.exports = AdmitadApi;