import fetch from './fetch';

const defaultTimeOut = 30000

export default class Api{

  private static defaultApiOptions(options: any, isFormData: null | boolean = null, noHeader?: boolean): any {
    let defaultApiHeaders = {
      'Content-Type': 'application/json',
    };
    if (isFormData) {

    }
    // To Do: typing for return type
    return {
      headers: defaultApiHeaders,
      timeout: defaultTimeOut,
    };
  };

  static get<T>(apiEndpoint: string, options = {}, noHeader?: boolean): Promise<T> {
    const apiOptions = Api.defaultApiOptions(options, null, noHeader);
    return fetch<T>(
      apiEndpoint,
      {
        method: 'GET',
        ...apiOptions,
      },
    );
  }

  static post<T, D>(apiEndpoint: string, data: D, options: any = {}, noHeader?: boolean): Promise<T> {
    const apiOptions = Api.defaultApiOptions(options, null, noHeader);
    return fetch(
      apiEndpoint,
      {
        method: 'POST',
        ...apiOptions,
        ...data
      },
    );
  }

  static put<T, D>(apiEndpoint: string, data: D, options: any = {}, noHeader?: boolean): Promise<T> {
    const apiOptions = Api.defaultApiOptions(options, null, noHeader);
    return fetch(
      apiEndpoint,
      {
        method: 'PUT',
        ...apiOptions,
        ...data
      },
    );
  }
}