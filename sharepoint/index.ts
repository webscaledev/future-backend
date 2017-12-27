import { config } from './config';
import { AuthenticationContext, TokenResponse, ErrorResponse } from 'adal-node';
import { readFileSync } from 'fs';
import * as path from 'path'
import * as request from 'request-promise-native';
import * as moment from 'moment';

moment;

// inspired by https://github.com/SharePoint/sp-dev-samples/tree/master/Samples/WebHooks.Nodejs

const certificate = readFileSync(path.join(__dirname, 'privatekey.pem'), 'utf8');

async function sync() {
    const api = `${config.webhookConfig.url}/_api/web/`;
    const sharepoint = new Sharepoint(api, config.adalConfig);

    const lists: any[] = await sharepoint.get('lists');
    console.log('all lists', lists.map(v => v.Title));

    const subscriptions: any[] = await sharepoint.get(`lists/getbytitle('Example List')/subscriptions`);
    console.log('subscriptions', subscriptions);

    await Promise.all(subscriptions.map(async s => {
        const del = await sharepoint.delete(`lists/getbytitle('Example List')/subscriptions('${s.id}')`);
        console.log(`delete ${s.id}`, del);
    }));

    // const addCloud = await sharepoint.post(`lists/getbytitle('Example List')/subscriptions`, {
    //     resource: `${api}lists/getbytitle('Example List')`,
    //     notificationUrl: 'https://us-central1-future-app-backend.cloudfunctions.net/echo/foo',
    //     expirationDateTime: moment().add(90, 'days'),
    //     clientState: config.webhookConfig.clientState,
    // });
    // console.log('cloud subscription added', addCloud);

    const addGoCloud = await sharepoint.post(`lists/getbytitle('Example List')/subscriptions`, {
        resource: `${api}lists/getbytitle('Example List')`,
        notificationUrl: 'https://future-app-backend.appspot.com/01f35a9d-2825-43f9-bad3-c39c3adf4008',
        expirationDateTime: moment().add(90, 'days'),
        clientState: config.webhookConfig.clientState,
    });
    console.log('cloud subscription added', addGoCloud);

    // const addLocal = await sharepoint.post(`lists/getbytitle('Example List')/subscriptions`, {
    //     resource: `${api}lists/getbytitle('Example List')`,
    //     notificationUrl: 'https://aa42d315.ngrok.io',
    //     expirationDateTime: moment().add(90, 'days'),
    //     clientState: config.webhookConfig.clientState,
    // });
    // console.log('local subscription added', addLocal);

}

class Sharepoint {
    constructor(private apiUri: string, private adalConfig: AdalConfig) { }

    private async getAppOnlyAccessToken() {
        const context = new AuthenticationContext(this.adalConfig.authority);
        return (await new Promise<TokenResponse>((resolve, reject) => {
            context.acquireTokenWithClientCertificate(this.adalConfig.resource, this.adalConfig.clientID, certificate, this.adalConfig.fingerPrint, (err, response) => {
                if (err) { return reject(err); }
                if (response.error) { return reject(response as ErrorResponse) }
                return resolve(response as TokenResponse);
            });
        })).accessToken;
    }

    public async get(uri: string) {
        return this.request(uri, 'GET');
    }

    public async post(uri: string, body: any) {
        return this.request(uri, 'POST', body);
    }

    public async delete(uri: string) {
        return this.request(uri, 'DELETE');
    }

    private async request(uri: string, method: string, body?: any) {
        const token = await this.getAppOnlyAccessToken();
        const response = await request({
            uri: this.apiUri + uri,
            method,
            json: true,
            body,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json;odata=nometadata', // or odata=verbose ??
            }
        });
        if (!response) { return }
        return Array.isArray(response.value) ? response.value as any[] : response as any;
    }

}

interface AdalConfig {
    authority: string;
    clientID: string;
    subscriptionUrl: string;
    resource: string;
    fingerPrint: string;

}

sync();
