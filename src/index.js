/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
const Firestore = require('@google-cloud/firestore');
const PROJECTID = 'equifax-hackathon-2020';
const COLLECTION_NAME = 'microservice-data';
const firestore = new Firestore({
  projectId: PROJECTID,
  timestampsInSnapshots: true,
});

exports.helloPubSub = (event, context) => {
  const message = event.data
    ? Buffer.from(event.data, 'base64').toString()
    : 'No data!';
    // store/insert a new document
    const created = new Date().getTime();
    return firestore.collection(COLLECTION_NAME)
      .add( JSON.parse(message) )
      .then(doc => {
        console.log(doc);
      }).catch(err => {
        console.error(err);
      });
};
