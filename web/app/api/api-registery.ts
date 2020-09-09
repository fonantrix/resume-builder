import { IApi, IKeyValue } from './types';

const loginApi: IApi = {
  apis: {
    login: '/api/auth'
  }
}

const signupApi: IApi = {
  apis: {
    register: '/api/users'
  }
}

const dashboardApi: IApi = {
  apis: {
    get_template: "/api/templates"
  }
}

const profileApi: IApi = {
  apis: {
    update_profile: "/api/users/$user_id",
    update_profile_field: "/api/users/user/$user_id",
  }
}

const fillCvApi: IApi = {
  apis: {
    get_template_section: "/api/templates/get/sections/$templateId",
    get_template_fields: "/api/templates/get/fields",
    update_user_resume: "/api/user/resumes/$resumeId",
    create_user_resume: "/api/user/resumes"
  }
}

export const apiList: IKeyValue = {
  ...loginApi.apis,
  ...dashboardApi.apis,
  ...signupApi.apis,
  ...profileApi.apis,
  ...fillCvApi.apis
};

class ApiRegistry {
  // To Do : extend all singelton class from abstract class and define getInstance function their
  private static instance: ApiRegistry;

  static getInstance(): ApiRegistry {
    if (!ApiRegistry.instance) {
      ApiRegistry.instance = new ApiRegistry();
    }

    return ApiRegistry.instance;
  }

  public buildApiUrl(api: string, options: any = { urlParam : {} }): string {

    if (
      api.toLowerCase().startsWith('http://')
      || api.toLowerCase().startsWith('https://')
    ) {
      return api;
    }

    let returnVal = '';
    let route = apiList[api];

    options.urlParam && Object.keys(options.urlParam).forEach((key) => {
      route = route.replace(key, options.urlParam[key]);
    })

    returnVal = route + (options.queryStringHash
      ? this.buildQueryStringParams(options.queryStringHash)
      : '');
    return returnVal;
  }
  // To Do: define type for queryStringHash
  public buildQueryStringParams(queryStringHash: any = {}): string {
    let resultString = '?';

    Object.keys(queryStringHash).forEach((keyName) => {
      resultString += `${keyName}=${encodeURIComponent(
        queryStringHash[keyName],
      )}&`;
    });

    resultString = resultString.slice(0, -1);

    return resultString;
  }
}

export default ApiRegistry.getInstance();