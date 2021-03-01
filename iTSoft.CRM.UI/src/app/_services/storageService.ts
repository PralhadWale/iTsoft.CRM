import { Injectable } from "@angular/core";
@Injectable({ providedIn: 'root' })
export class StorageService {

    SetItem(key: string, data: any, isObject: boolean = true) {
        if (isObject) {
            localStorage[key] = JSON.stringify(data);
        }
        else {
            localStorage[key] = data;
        }
    }

    GetItem(key: string, isObject: boolean = true) {
        if (localStorage[key]) {
            if (isObject) {
                return JSON.parse(localStorage[key]);
            }
            else {
                return localStorage[key];
            }
        }
        else {
            return null;
        }
    }

}