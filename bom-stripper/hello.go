package hello

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"

	"appengine"
	"appengine/urlfetch"
)

func init() {
	http.HandleFunc("/01f35a9d-2825-43f9-bad3-c39c3adf4008", handler)
}

func handler(w http.ResponseWriter, r *http.Request) {

	ctx := appengine.NewContext(r)
	ctx.Infof("handling request " + r.URL.String())

	// read request body
	inBytes, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	ctx.Infof("request body " + string(inBytes))

	// remove BOM marker from request body
	trimmedBytes := bytes.Trim(inBytes, "\xef\xbb\xbf")
	ctx.Infof("removed " + strconv.Itoa(len(inBytes)-len(trimmedBytes)) + " BOM bytes")

	// perform outbound request with stripped body
	client := urlfetch.Client(ctx)
	url := os.Getenv("FUNCTIONS_URI") + "?" + r.URL.RawQuery
	ctx.Infof("invoking " + url)
	resp, err := client.Post(url, r.Header.Get("Content-Type"), bytes.NewBuffer(trimmedBytes))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// read body for response to forwarded request
	respBytes, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	ctx.Infof("backend response code " + strconv.Itoa(resp.StatusCode))
	ctx.Infof("backend response " + string(respBytes))

	if resp.StatusCode != 200 {
		ctx.Infof("forwarding backend error to client")
		http.Error(w, string(respBytes), resp.StatusCode)
		return
	}

	// we're done. Forward backend response to client
	w.Write(respBytes)
}
