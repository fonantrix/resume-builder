
export interface IKeyValue {
    [key: string]: string;
}

export interface IApi {
    apis: IKeyValue
}

export interface IApiEndpoint {
    production: IEndpoint;
    static: IStatic,
}

interface IEndpoint {
    hostname: string;
    API_KEY: string;
    FIRE_BASE: any // To Do: change to interface
}

interface IStatic {
    FIRE_STORE_URL: string;
    BUCKET_QUERY_PARAM: string;
    BUCKET_URL: string;
}

export interface IApiUrl {
    queryStringHash?: IKeyValue;
    urlParam?: IKeyValue
}