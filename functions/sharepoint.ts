import { AuthenticationContext, TokenResponse, ErrorResponse } from 'adal-node';
import { readFileSync } from 'fs';
import * as path from 'path'
import * as request from 'request-promise-native';

// TODO: get from storage or database
const certificate = readFileSync(path.join(__dirname, 'privatekey.pem'), 'utf8');

// inspired by https://github.com/SharePoint/sp-dev-samples/tree/master/Samples/WebHooks.Nodejs

export class Sharepoint {
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
