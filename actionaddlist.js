/**
 * The next function is used to add a list from Google actions to your response
 * @param {*} res       A result from actions of Google
 * @param {*} myarray   Array where data is stored as 0: name_1; 1: url_1; 2; name_2...
 */
function actionaddlist(res, myarray) {
  let i = 0;
  let itemscollection = [];
  let myarraylength = myarray.length;

// This loop could be substituted depending on your array.
// As I'm sure myarraylength will be even, [i+1] shouldn't be a problem
  while (i < myarraylength) {
    name = myarray[i];
    url = myarray[i + 1];

    itemscollection.push({
      "info": {
        "key": url
      },
      "title": name,
      "image": {}
    });

    i += 2;
  }

  res.fulfillmentMessages.push(
    {
      "platform": "ACTIONS_ON_GOOGLE",
      "listSelect": {
        "items": itemscollection
      }
    }
  );
}
