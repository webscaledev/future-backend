import * as functions from 'firebase-functions';

export const cde99ee3b82d44c18d6bfd8d017f8232 = functions.https.onRequest(httpSharepointWebhook);
// export const pubsubNotification = functions.pubsub.topic('sharepoint-notification').onPublish(pubsubSharepontNotification);

function httpSharepointWebhook(req: functions.Request, res: functions.Response) {
    console.log('file', __filename);
    console.log('dir', __dirname);
    console.log('method', req.method);
    console.log('body type', typeof req.body);
    console.log('body', req.body);
    console.log('url', req.url);
    console.log('validationtoken', req.query.validationtoken);
    res.type('text/plain').send(req.query.validationtoken);
}

// async function pubsubSharepontNotification(evt: functions.Event<functions.pubsub.Message>) {
//     let json: any;
//     try {
//         json = evt.data.json;
//     } catch (e) {
//         console.error('payload is no json');
//         return;
//     }

//     console.log('got message', json);
//     console.log('message attributes', evt.data.attributes);
// }
