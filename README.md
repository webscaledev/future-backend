# Installation and Configuration

- Create a new private key / certificate pair by running `npm run keycred` in the `functions` directory. Choose
  to create a new certificate, answer all questions (values don't really matter) and set the certificate to expire
  in 30 years.
- In Azure AD create a new `App Registration`
  - Under `Required Permissions` add the *Application Permission*
    `Read and write items and lists in all site collections` from the `Office 365 SharePoint Online` API category
  - Click the `Grant Permissions` button in the header of the `Required Permissions` panel to activate the
    permissions
  - Edit the manifest (button in header) for the new Registered App and add the Key Credentials object you got
    from running `keycred` to the `keyCredentials` array in the manifest to allow certificate-based signin to this application user (aka service account)
- Finally your cloud functions need to know about this security information. Store the certificate fingerprint and
  the Azure AD Application ID in a Firestore document `/config/auth` with keys `certFingerprint` and `clientId`.
  The private key should be stored in Firebase Storage in a file named `config/privkey.pem`.
  Be sure to lockdown both the Firestore and Firebase Storage with rules to keep this information private.
- Run deploy.sh that deploys both the App Engine as the Firebase project
- Go to the Firebase Functions console and run the initialization Function

# Visual Studio Code and App Engine Go

See https://gist.github.com/pavanpodila/8bd0946e767597a9265464426109c609 and http://www.mazsoft.com/blog/post/2017/01/09/develop-go-appengine-api-using-visual-studio-code

```shell
> cd $PATH_TO_GAE_SDK/platform/google_appengine/goroot-1.8/bin
> ln -s goapp go
```

Ensure GOPATH environment variable is set since you're no longer using the default location and add Cloud SDK Go path to your PATH, for example by adding to your `~/.bash_profile`:
```shell
export GOROOT=~/google-cloud-sdk/platform/google_appengine/goroot-1.8
export PATH=$GOROOT/bin:$PATH
```

Start a new terminal to activate any changes in `.bash-profile` and check that both `go` and `goapp` are available from your AppEngine Go SDK:
```shell
> which go
> which gopp
```

Now, (re-)install vscode-go extension. Find the freshly installed `gocode` tool. For my installation it was put in `~/go/bin` but your situation might differ.
Stop `gocode` and set its library path to point to the google cloud app engine:

```shell
> gocode close
> gocode set "lib-path" "$GOROOT/pkg/darwin_amd64_appengine"
```

Restart VSCode and see if the following works in a go file without errors:

```go
import (
	"fmt"
	"appengine"
)
```

# Testing

```shell
# directly to local go proxy:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt http://localhost:8080/01f35a9d-2825-43f9-bad3-c39c3adf4008?validationtoken=foo

# directly to firebase cloud function:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://us-central1-future-app-backend.cloudfunctions.net/cde99ee3b82d44c18d6bfd8d017f8232

# to ngrok that forwards to local go proxy that forwards to firebase cloud function:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://aa42d315.ngrok.io?validationtoken=foo

# to deployed bom stripper
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://future-app-backend.appspot.com/01f35a9d-2825-43f9-bad3-c39c3adf4008?validationtoken=foo

```

# Other Resources

- https://github.com/SharePoint/sp-dev-samples/tree/master/Samples/WebHooks.Nodejs sharepoint webhooks from nodejs including
  private key based authentication to sharepoint
- https://msdn.microsoft.com/library/office/jj860569(v=office.15).aspx Sharepoint REST API Reference docs
- https://docs.microsoft.com/en-us/sharepoint/dev/apis/webhooks/overview-sharepoint-webhooks Docs on Sharepoint Webhooks
- https://github.com/SharePoint/PnP-JS-Core Sharepoint JavaScript API
- https://blogs.msdn.microsoft.com/patrickrodgers/2016/10/17/using-pnp-js-core-and-node-sp-auth/ on using pnp-js-core with node-sp-auth
