export const config = {
    adalConfig: {
        authority: 'https://login.microsoftonline.com/tfgdev.onmicrosoft.com',
        resource: 'https://tfgdev.sharepoint.com',
    },
    webhookConfig: {
        url: 'https://tfgdev.sharepoint.com/sites/ExampleTeamSite',
        // "url": "https://tfgdev.sharepoint.com/",
        listName: 'Example List',
        /** "secret" code that sharepoint will post back to verify request is comming from them */
        clientState: '915fbff2-e710-46c8-8888-e1277df50539',
    },
};
