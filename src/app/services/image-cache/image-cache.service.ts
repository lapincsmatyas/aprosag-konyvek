import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, mergeMap, take, tap, toArray} from "rxjs/operators";
import {getDownloadURL, ref, Storage} from "@angular/fire/storage";
import {from, Observable} from "rxjs";
import {Item} from "../../model/item.model";
import {collectionData} from "@angular/fire/firestore";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  private cachedUrls : Map<string, string> = new Map();

  constructor(private http: HttpClient, private fireStorage: Storage, private sanitizer: DomSanitizer) {
  }

  async getImage(url: string): Promise<string> {
    if(!this.cachedUrls.has(url)){
      const temp = await getDownloadURL(ref(this.fireStorage, url));
      this.cachedUrls.set(url, temp);
      return temp;
    } else {
      return this.cachedUrls.get(url) || "";
    }
  }
}
