import { Observable, of } from "rxjs";
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
import { Config } from "../../../config";
import { AuthService } from "../auth/auth";
import * as moment from "moment";

@Injectable({ providedIn: "root" })
export class SharepointService {
  currentYear;
  imageToShow;
  constructor(public http: HttpClient, private auth: AuthService) {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    this.currentYear = year + "-" + month + "-01";
  }

  async getPhoto(userid): Promise<any> {
    const result = await this.http
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
    const temporaryFileReader = new FileReader();
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
            res.value.map(item => {
              // console.log('NEWS', JSON.stringify(item));
              return {
                displayName: item.createdBy.user.displayName,
                email: item.createdBy.user.email,
                userid: item.createdBy.user.id,
                webUrl: item["@microsoft.graph.downloadUrl"],
                id: item.id,
                mimetype: item.file.mimeType,
                lastModified: moment(item.fileSystemInfo.lastModifiedDateTime).format("LL"),
                weekNumber: moment(item.fileSystemInfo.lastModifiedDateTime).week(),
                createDate: moment(item.createdDateTime).format("LL")
              };
            }) || []
        ),
        catchError(err => of(err.json()))
      );
  }

  async getPdf(url): Promise<any> {
    const result = await this.http
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
        catchError(err => of(err.json()))
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
            res.value.map(job => {
              // console.log("JOBS", JSON.stringify(res.id));
              return {
                displayName: job.createdBy.user.displayName,
                email: job.createdBy.user.email,
                userid: job.createdBy.user.id,
                webUrl: job.webUrl,
                id: job.id,
                createDate: moment(job.createdDateTime).format("LL")
              };
            }) || []
        ),
        catchError(err => of(err.json()))
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
        catchError(err => of(err.json()))
      );
  }
}
