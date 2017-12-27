import * as functions from 'firebase-functions';
import { firestore, initializeApp } from 'firebase-admin';
import * as pubsub from '@google-cloud/pubsub';
import { config } from './config';
import { setup, Web } from "sp-pnp-js";
import * as nodeFetch from 'node-fetch';
import { AuthenticationContext, TokenResponse, ErrorResponse } from 'adal-node';
import { readFileSync } from 'fs';
import * as path from 'path'

// inspired by https://github.com/SharePoint/sp-dev-samples/tree/master/Samples/WebHooks.Nodejs

const projectId = 'future-app-backend';
const topicName = 'sharepoint-notifications';
const firestoreCollection = 'test-items';
const firestoreSyncStateDoc = '/config/sync-state';
const notificationUrl = 'https://future-app-backend.appspot.com/01f35a9d-2825-43f9-bad3-c39c3adf4008';

// TODO: get from storage or database
const certificate = readFileSync(path.join(__dirname, 'privatekey.pem'), 'utf8');

export const webhookcde99ee3b82d44c18d6bfd8d017f8232 = functions.https.onRequest(httpSharepointWebhook);
export const initializee7ab0e6b9b1a413695181137a149b757 = functions.https.onRequest(initializeSync);
export const pubsubNotification = functions.pubsub.topic(topicName).onPublish(pubsubSharepointNotification);

const cfg = functions.config();
if (!cfg.firebase) {
    throw new Error('No firebase config found!!?');
}
initializeApp(cfg.firebase);

const web = new Web(config.webhookConfig.url);
const list = web.lists.getByTitle(config.webhookConfig.listName);

/*
    to test in functions shell:
    webhookcde99ee3b82d44c18d6bfd8d017f8232.post().json({value:
        [{
            subscriptionId: '90c93769-560e-4432-ade0-1f73a37ad8a2',
            clientState: '915fbff2-e710-46c8-8888-e1277df50539',
            expirationDateTime: '2018-03-26T06:34:48.8110000Z',
            resource: 'a30fa073-df7d-413b-9113-986d8e617827',
            tenantId: '624da980-6a1a-48fd-83c7-af3ae3e41911',
            siteUrl: '/sites/ExampleTeamSite',
            webId: '4d323110-7184-4d75-a629-62f0db9cc757'
        }]
    })

    or single line:
    webhookcde99ee3b82d44c18d6bfd8d017f8232.post().json({value:[{subscriptionId:'90c93769-560e-4432-ade0-1f73a37ad8a2',clientState:'915fbff2-e710-46c8-8888-e1277df50539',expirationDateTime:'2018-03-26T06:34:48.8110000Z',resource:'a30fa073-df7d-413b-9113-986d8e617827',tenantId:'624da980-6a1a-48fd-83c7-af3ae3e41911',siteUrl:'/sites/ExampleTeamSite',webId:'4d323110-7184-4d75-a629-62f0db9cc757'}]})
    */
async function httpSharepointWebhook(req: functions.Request, res: functions.Response) {
    try {
        console.log('got sharepoint notification', req.body);
        const pubsubClient = pubsub({ projectId });
        const topic = pubsubClient.topic(topicName);
        const publisher = topic.publisher({ batching: { maxMessages: 1, maxMilliseconds: 10 } });
        console.log('publishing notification to pubsub');
        await publisher.publish(new Buffer(JSON.stringify(req.body)));

        // return validationtoken query param in case this is the sharepoint webhook registration probe request
        res.type('text/plain').send(req.query.validationtoken || '');
        console.log('done');
    } catch (e) {
        console.error('error in cloud function', e);
        console.error(JSON.stringify(e, undefined, 4));
        throw e;
    }
}

/*
    to test in functions shell:
    initializee7ab0e6b9b1a413695181137a149b757.get()
*/
async function initializeSync(_req: functions.Request, res: functions.Response) {
    try {
        console.log('initializing sharepoint sync');
        await setupSharepointToken();
        const db = firestore();
        let batch = db.batch();

        // delete changeToken in database to clear any existing sync state
        const stateDoc = await db.doc(firestoreSyncStateDoc).get();
        if (stateDoc.exists) {
            console.log('clearing changeToken from database');
            batch.update(stateDoc.ref, { changeToken: firestore.FieldValue.delete() });
        }
        // delete any existing documents
        const collection = await db.collection(firestoreCollection).get();
        collection.forEach(doc => {
            console.log('deleting database document', doc.ref.path);
            batch.delete(doc.ref);
        });
        console.log('committing database changes');
        batch.commit();

        // sync all existing documents
        batch = db.batch();
        console.log('storing existing sharepoint list items as db docs');
        const items: any[] = await list.items.get();
        items.map((item: any) => {
            const docRef = db.collection(firestoreCollection).doc(`${item.Id}`);
            console.log('storing sharepoint item', item.Id, 'as', docRef.path);
            batch.set(docRef, item);
        });
        console.log('committing database changes');
        batch.commit();

        // get existing subscriptions
        const subscriptions: Subscription[] = await list.subscriptions.get();
        console.log('existing list subscriptions', subscriptions);

        // delete any of our old subscriptions
        await Promise.all(subscriptions.filter(s => s.notificationUrl.startsWith('https://future-app-backend.appspot.com')).map(async s => {
            console.log('deleting subscription', s.id);
            await list.subscriptions.getById(s.id).delete();
            console.log('deleted subscription', s.id);
        }));

        // creating new sharepoint list subscription
        console.log('adding sharepoint list subscription');
        const addResp = await list.subscriptions.add(notificationUrl, subscriptionExpirationDate(), config.webhookConfig.clientState);
        console.log('added subscription', addResp.data);

        res.send();
    } catch (e) {
        console.error('error in cloud function', e);
        console.error(JSON.stringify(e, undefined, 4));
        throw e;
    }
}

/*
to test in functions shell:
pubsubNotification({data: new Buffer(JSON.stringify({value:
    [{
        subscriptionId: 'aec19e67-e12c-48da-9088-16d23ad91a0c',
        clientState: '915fbff2-e710-46c8-8888-e1277df50539',
        expirationDateTime: '2018-03-26T06:34:48.8110000Z',
        resource: 'a30fa073-df7d-413b-9113-986d8e617827',
        tenantId: '624da980-6a1a-48fd-83c7-af3ae3e41911',
        siteUrl: '/sites/ExampleTeamSite',
        webId: '4d323110-7184-4d75-a629-62f0db9cc757'
    }]
}))})

or single line:
pubsubNotification({data: new Buffer(JSON.stringify({value:[{subscriptionId:'aec19e67-e12c-48da-9088-16d23ad91a0c',clientState:'915fbff2-e710-46c8-8888-e1277df50539',expirationDateTime:'2018-03-26T06:34:48.8110000Z',resource:'a30fa073-df7d-413b-9113-986d8e617827',tenantId:'624da980-6a1a-48fd-83c7-af3ae3e41911',siteUrl:'/sites/ExampleTeamSite',webId:'4d323110-7184-4d75-a629-62f0db9cc757'}]}))})
*/
async function pubsubSharepointNotification(evt: functions.Event<functions.pubsub.Message>) {
    try {
        let payload: Notifications;
        try {
            payload = evt.data.json;
        } catch (e) {
            console.error('payload is no json');
            return;
        }
        console.log('got sharepoint notification', payload);
        if (!payload.value) {
            console.log('ignoring notification without payload');
            return;
        }
        // TODO: verify payload correctness (including secret and listid)

        await setupSharepointToken();
        const db = firestore();
        const batch = db.batch();

        let changeToken: string | undefined = undefined;
        const stateDoc = await db.doc(firestoreSyncStateDoc).get();
        if (stateDoc.exists && stateDoc.data().changeToken) {
            changeToken = stateDoc.data().changeToken;
            console.log('getting changes since token', changeToken);
        } else {
            await stateDoc.ref.set({});
        }

        for (const notification of payload.value) {
            // renew sharepoint subscription (expires after 90 days)
            const expiration = subscriptionExpirationDate();
            console.log('renewing subscription until', expiration)
            await list.subscriptions.getById(notification.subscriptionId).update(expiration);
            console.log('renewed subscription, now getting changes since', changeToken);
            // get all changes to list, see SP.ChangeQuery Properties: https://msdn.microsoft.com/en-us/library/office/ee550385(v=office.14).aspx
            // list.getListItemChangesSinceToken returns XML, so we go for the explicit route using getChanges
            const changes: ChangeItem[] = await list.getChanges({
                Item: true,
                Add: true,
                Update: true,
                DeleteObject: true,
                Restore: true,
                ChangeTokenStart: changeToken ? { StringValue: changeToken } : undefined
            })
            // reverse sort by timestamp
            changes.sort((a, b) => a.Time < b.Time ? 1 : a.Time > b.Time ? -1 : 0);
            console.log('fetched changes', changes);
            // get most recent changeToken and store it for the future
            if (changes.length) {
                changeToken = changes[0].ChangeToken!.StringValue; // reverse sorted by timestamp. so index 0 is most recent changeToken
                console.log('update changeToken to', changeToken);
                batch.update(stateDoc.ref, { changeToken });
            }
            // get distinct item ids
            const itemIds = new Set(changes.map(c => c.ItemId!));
            // for each item id get most recent change type (to nullify things like add and remove in singe changeset)
            const lastChangeTypes = Array.from(itemIds).map(id => ({ id, changeType: changes.find(c => c.ItemId === id)!.ChangeType! }));
            // for each item id and change type add a database change to the batch
            await Promise.all(lastChangeTypes.map(change => {
                const docRef = db.collection(firestoreCollection).doc(`${change.id}`);
                switch (change.changeType) {
                    case ChangeType.Added:
                    case ChangeType.Restore:
                    case ChangeType.Updated:
                        return web.lists.getById(notification.resource).items.getById(change.id).get().then(item => {
                            console.log('updating document', change.id);
                            batch.set(docRef, item);
                        });
                    case ChangeType.Deleted:
                        console.log('deleting document', change.id);
                        batch.delete(docRef);
                        return Promise.resolve();
                    default:
                        return Promise.resolve();
                }
            }));
        }
        // execute database batch
        console.log('commiting database change');
        await batch.commit();

        console.log('done');
    } catch (e) {
        console.error('error in cloud function', e);
        console.error(JSON.stringify(e, undefined, 4));
        throw e;
    }
}

interface Notifications {
    value: Array<{
        subscriptionId: string;
        clientState: string;
        expirationDateTime: string;
        resource: string;
        tenantId: string;
        siteUrl: string;
        webId: string;
    }>
}

interface ChangeItem {
    ChangeToken?: ChangeToken;
    ChangeType?: ChangeType;
    SiteId?: string;
    Time: number;
    Editor?: string;
    ItemId?: number;
    ListId?: string;
    ServerRelativeUrl?: string;
    WebId?: string;
}

interface ChangeToken {
    StringValue?: string;
}

// SP.ChangeType Enumeration: https://msdn.microsoft.com/en-us/library/office/ee554890(v=office.14).aspx
enum ChangeType {
    Added = 1,
    Updated = 2,
    Deleted = 3,
    Restore = 7,
}

interface Subscription {
    clientState: string;
    expirationDateTime: string; // iso zulu format
    id: string;
    notificationUrl: string;
    resource: string;
    resourceData: any;
}

declare var global: any;
async function setupSharepointToken() {
    global.Headers = nodeFetch.Headers;
    global.Request = nodeFetch.Request;
    global.Response = nodeFetch.Response;
    global.fetch = nodeFetch;
    setup({
        sp: {
            headers: {
                'Authorization': `Bearer ${await getAppOnlyAccessToken()}`
            }
        }
    });
}

async function getAppOnlyAccessToken() {
    const context = new AuthenticationContext(config.adalConfig.authority);
    return (await new Promise<TokenResponse>((resolve, reject) => {
        context.acquireTokenWithClientCertificate(config.adalConfig.resource, config.adalConfig.clientID, certificate, config.adalConfig.fingerPrint, (err, response) => {
            if (err) { return reject(err); }
            if (response.error) { return reject(response as ErrorResponse) }
            return resolve(response as TokenResponse);
        });
    })).accessToken;
}

function subscriptionExpirationDate() {
    return new Date(Date.now() + 89 * 24 * 60 * 60 * 1000).toISOString();
}
