export const config = {
    adalConfig: {
        authority: 'https://login.microsoftonline.com/tfgdev.onmicrosoft.com',
        clientID: '14fe2bf1-63c1-40a0-abc7-fd59e735059f',
        resource: 'https://tfgdev.sharepoint.com',
        fingerPrint: '7236b4292c82a00d0578c48fc21876e348b1498d',
    },
    webhookConfig: {
        url: 'https://tfgdev.sharepoint.com/sites/ExampleTeamSite',
        // "url": "https://tfgdev.sharepoint.com/",
        listName: 'Example List',
        /** "secret" code that sharepoint will post back to verify request is comming from them */
        clientState: '915fbff2-e710-46c8-8888-e1277df50539',
    },
};
