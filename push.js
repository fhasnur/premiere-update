const webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BOlqWkFhEfHY-Ck5VtqiaABVJ4nh_-w6I9yKSkk2trhcVSq7kH9OE4cS0UuHFFQdGYj1MkCpPX5KbZzpaYzzvcc",
  "privateKey": "eIsf0ZUKzuHVfwtFoUThkMa2Zpttl1_EylXJYeq4C4g"
};


webPush.setVapidDetails(
  'mailto:fandi.hasnur10@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/c-1aE1Jw-6c:APA91bHIlrLg8mU1UPQkhVRFzlrjyXlN1k1C2GfgOO5iOGoRyf3cvr3VV9zHB-C7qHS4g6wmZA-iDVDWaYY2clmCCpciR7nekcLScT5lP7T_cnwM4FrOUjkdWAcJ-DoBTUT5R7FAWwJi",
  "keys": {
    "p256dh": "BET9bfdfHvUvEkDtVTSKAucngKCu2VRENCYeBO1iXuAoB6k//cp7JuZ7hYyubImnpdES7PsCrF7NAPwspdXbt1c=",
    "auth": "37pzhcglaPI4D5fTmxBf+g=="
  }
};
const payload = 'Premiere League Update Everyday';

const options = {
  gcmAPIKey: '233842184370',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);