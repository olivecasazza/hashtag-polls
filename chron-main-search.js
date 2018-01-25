const cron = require('node-cron');
const mongoose = require('mongoose')
const Twit = require('twit')
const keys = require('./creds.js');
Campaign = require('./models/campaign');
Tweet = require('./models/campaign');

const T = new Twit({
    consumer_key: keys.twitterCreds.consumer_key,
    consumer_secret: keys.twitterCreds.consumer_secret,
    access_token: keys.twitterCreds.access_token,
    access_token_secret: keys.twitterCreds.access_token_secret,
});

mongoose.connect('mongodb://localhost/campaign-list');
var db = mongoose.connection;

T.get('search/tweets', {
    q: "#metoo"
}, function (err, data, response) {
    let parsed_data = data.statuses
    console.log(Object.keys(parsed_data));
});

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//     cron.schedule('* * * * *', function () {
//         console.log("Chron Job Started!")
//         try {
//             console.log("Searching for campaigns")
//             Campaign.find(function (err, campaigns) {
//                 campaigns.forEach(campaign => {
//                     console.log(campaign.campaign_name)
//                     let current_tweet_ids = campaign.tweets.map(tweet => {
//                         return tweet.id_str
//                     });
//                     console.log(current_tweet_ids.toString())

//                     T.get('search/tweets', {
//                         q: campaign.campaign_tags
//                     }, function (err, data, response) {
                        
//                         data.statuses.forEach(tweet => {
//                             if (!current_tweet_ids.includes(tweet.id_str)) {
//                                 console.log("new tweet...")
//                                 Campaign.update({
//                                         "_id": campaign._id
//                                     }, {
//                                         "$push": {
//                                             "tweets": {
//                                                 text: tweet.text,
//                                                 id_str: tweet.id_str,
//                                                 username: tweet.user.name,
//                                                 user_img: tweet.user.url,
//                                                 favorite_count: "" + tweet.favorite_count,
//                                                 reply_count: "" + tweet.reply_count,
//                                                 retweet_count: "" + tweet.reply_count,
//                                                 created_at: String(tweet.created_at)
//                                             }
//                                         }
//                                     },
//                                     function (err, callback) {
//                                         if (err) console.log(err)
//                                     });
//                             }
//                         });
//                     });
//                 });
//             });
//         } catch (e) {
//             console.log(e)
//         }
//     });
// });



// function mainSearch() {
//     ref.once('value', function (snapshot) {
//         snapshot.forEach(function (childSnapshot) {
//             let childKey = childSnapshot.key;
//             let childData = childSnapshot.val();
//             let campaign_ref = database.ref('campaigns/' + childKey);

//             T.get('search/tweets', {
//                 q: childData.campaign_tags.split(',')
//             }, function (err, data, response) {
//                 if (err)
//                     throw (new Error('Error in tweets.'));
//                 else {
//                     console.log("Starting hashtag search for " + childKey + ". Tags to Search: " + childData.campaign_tags)
//                     
//                 }
//             }).then(function(){
//                 console.log("\n------------\nchron job done\n------------\n")
//             });
//         });
//     }).then(function(){
//         console.log("\n------------\nmain search done\n------------\n")
//     })
// }