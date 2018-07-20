import { Observable } from "rxjs/Observable";
import {
  map,
  flatMap,
  catchError,
  mergeMap,
  take,
  tap,
  switchMap,
  groupBy
} from "rxjs/operators";
import "rxjs/add/operator/catch";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Config } from "../../config";
import { AuthProvider } from "../auth/auth";
import * as moment from "moment";

@Injectable()
export class SharepointProvider {
  currentYear;
  imageToShow;
  constructor(public http: HttpClient, private auth: AuthProvider) {
    let currentDate = new Date();
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    this.currentYear = year + "-" + month + "-01";
  }

  async getPhoto(userid): Promise<any> {
    let result = await this.http
      .get(
        "https://graph.microsoft.com/v1.0/users/" +
          userid +
          "/photos/96x96/$value",
        {
          headers: {
            Authorization: "Bearer " + this.auth.getAccessToken()
          },
          responseType: "blob",
          observe: "response"
        }
      )
      .toPromise()
      .then(res => res.body);
    if (result) {
      return await this.createUrlFromBlob(result);
    }
  }

  createUrlFromBlob(file: Blob) {
    let temporaryFileReader = new FileReader();
    if (!file) {
      return;
    }
    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject("Problem parsing input file.");
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(file);
    });
  }

  getNews(rows: string) {
    return this.http
      .get(Config.sharepoint.downloadPdf, {
        // params: {
        //   top: rows,
        //   filter: `Fields/Created ge '${this.currentYear}'`
        // },
        headers: {
          Authorization: "Bearer " + this.auth.getAccessToken(),
          Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly"
        }
      })
      .pipe(
        map(
          (res: any) =>
            res.value.map(res => {
              // console.log('NEWS', JSON.stringify(res));
              return {
                displayName: res.createdBy.user.displayName,
                email: res.createdBy.user.email,
                userid: res.createdBy.user.id,
                webUrl: res["@microsoft.graph.downloadUrl"],
                id: res.id,
                mimetype: res.file.mimeType,
                lastModified: moment(res.fileSystemInfo.lastModifiedDateTime).format("LL"),
                weekNumber: moment(res.fileSystemInfo.lastModifiedDateTime).week(),
                createDate: moment(res.createdDateTime).format("LL")
              };
            }) || []
        ),
        catchError(err => Observable.of(err.json()))
      );
  }

  async getPdf(url): Promise<any> {
    let result = await this.http
      .get(url, {
        headers: {
          Authorization: "Bearer " + this.auth.getAccessToken()
        },
        responseType: "blob",
        observe: "response"
      })
      .toPromise()
      .then(res => res.body);
    if (result) {
      return await this.createUrlFromBlob(result);
    }
  }

  getNewsItem(id): Observable<any> {
    return this.http
      .get(Config.sharepoint.news + "/" + id, {
        headers: { Authorization: "Bearer " + this.auth.getAccessToken() }
      })
      .pipe(
        map((results: any) => {
          return results.fields;
          // console.log(results.fields);
        }),
        catchError(err => Observable.of(err.json()))
      );
  }

  getJobs(rows: string): Observable<any> {
    return this.http
      .get(Config.sharepoint.jobs, {
        params: {
          top: rows,
          filter: `Fields/Created ge '${this.currentYear}'`
        },
        headers: {
          Authorization: "Bearer " + this.auth.getAccessToken(),
          Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly"
        }
      })
      .pipe(
        map(
          (res: any) =>
            res.value.map(res => {
              // console.log("JOBS", JSON.stringify(res.id));
              return {
                displayName: res.createdBy.user.displayName,
                email: res.createdBy.user.email,
                userid: res.createdBy.user.id,
                webUrl: res.webUrl,
                id: res.id,
                createDate: moment(res.createdDateTime).format("LL")
              };
            }) || []
        ),
        catchError(err => Observable.of(err.json()))
      );
  }

  getJobsItem(id): Observable<any> {
    return this.http
      .get(Config.sharepoint.jobs + "/" + id, {
        headers: { Authorization: "Bearer " + this.auth.getAccessToken() }
      })
      .pipe(
        map((data: any) => {
          // console.log("FIELDS", JSON.stringify(data));
          return data.fields;
        }),
        catchError(err => Observable.of(err.json()))
      );
  }
}
