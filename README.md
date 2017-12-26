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
# directly to go proxy:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt http://localhost:8080/01f35a9d-2825-43f9-bad3-c39c3adf4008?validationtoken=foo

# directly to firebase cloud function:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://us-central1-future-app-backend.cloudfunctions.net/cde99ee3b82d44c18d6bfd8d017f8232

# to ngrok that forwards to local go proxy that forwards to firebase cloud function:
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://aa42d315.ngrok.io?validationtoken=foo

# to deployed bom stripper
curl -i -X POST -H "Content-Type: application/json" -d @body-with-bom.txt https://future-app-backend.appspot.com/01f35a9d-2825-43f9-bad3-c39c3adf4008?validationtoken=foo

```
