import { Switch, Route, Router, BrowserRouter } from 'react-router-dom';
import Endpoint from '../api/endpoint';

export class Helper {
    public static get<T, O, K, D>(object: O extends Object | T ? any : any, keys: K extends string ? any : any, defaultVal: D | T): T | D {
        keys = Array.isArray(keys) ? keys : keys.split('.');
        object = object[keys[0]];
        keys = keys.slice(1);
        if(object && Array.isArray(object) && keys[0] && !isNaN(keys[0])){
            object = object[keys[0]];
            keys = keys.slice(1);
        }
        if (object && keys.length > 0) {
            return Helper.get(object, keys, defaultVal);
        }
        return object === undefined ? defaultVal : object;
    }

    public static encodeURIComponent(uri: string): string {
        return encodeURIComponent(uri)
    }

    public static decodeURIComponent(uri: string): string {
        return decodeURIComponent(uri)
    }

    public static verifyEmail(value: string): boolean {
        const regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(value)) {
            return true;
        }
        return false;
    }

    public static navigateUrl(history: any, url: string): void {
        history.push(url);
    }

    public static navigateWindowUrl(url: string): void {
        window.location.pathname = url;
    }

    public static setStorageData(key: string, data: any): void {
        window.localStorage.setItem(key, JSON.stringify(data));
    }

    public static getStorageData<T>(key: string): T{
        return JSON.parse(window.localStorage.getItem(key));
    }

    public static removeStorageData(key: string): void {
        window.localStorage.removeItem(key);
    }

    public static constructImageUrl(url: string): string {
        return `${Endpoint.static.FIRE_STORE_URL}${Helper.encodeURIComponent(url)}?${Endpoint.static.BUCKET_QUERY_PARAM}`
    }
}