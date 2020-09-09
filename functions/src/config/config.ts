import * as functions from "firebase-functions";
export const config = () => {
    const environment = (functions.config().admin !== undefined) ? functions.config().admin.environment : '';
    switch (environment) {
      case "stage":
        return {
          apiKey: "AIzaSyDHm9PjSoppqwocH6lr7IeCKbAKC_khRA8",
          authDomain: "resumebuilder-cc4f8.firebaseapp.com",
          databaseURL: "https://resumebuilder-cc4f8.firebaseio.com",
          projectId: "resumebuilder-cc4f8",
          storageBucket: "resumebuilder-cc4f8.appspot.com",
          messagingSenderId: "930396395300",
          appId: "1:930396395300:web:b7c45a03f417de507b05b1",
          measurementId: "G-Z77H2NC0JQ"
      };
      case "prod":
        return {
          apiKey: "AIzaSyDHm9PjSoppqwocH6lr7IeCKbAKC_khRA8",
          authDomain: "resumebuilder-cc4f8.firebaseapp.com",
          databaseURL: "https://resumebuilder-cc4f8.firebaseio.com",
          projectId: "resumebuilder-cc4f8",
          storageBucket: "resumebuilder-cc4f8.appspot.com",
          messagingSenderId: "930396395300",
          appId: "1:930396395300:web:b7c45a03f417de507b05b1",
          measurementId: "G-Z77H2NC0JQ"
      };
      case "dev":
        return {
          apiKey: "AIzaSyDHm9PjSoppqwocH6lr7IeCKbAKC_khRA8",
          authDomain: "resumebuilder-cc4f8.firebaseapp.com",
          databaseURL: "https://resumebuilder-cc4f8.firebaseio.com",
          projectId: "resumebuilder-cc4f8",
          storageBucket: "resumebuilder-cc4f8.appspot.com",
          messagingSenderId: "930396395300",
          appId: "1:930396395300:web:b7c45a03f417de507b05b1",
          measurementId: "G-Z77H2NC0JQ"
        };
      default:
        return {
          apiKey: "AIzaSyDHm9PjSoppqwocH6lr7IeCKbAKC_khRA8",
          authDomain: "resumebuilder-cc4f8.firebaseapp.com",
          databaseURL: "https://resumebuilder-cc4f8.firebaseio.com",
          projectId: "resumebuilder-cc4f8",
          storageBucket: "resumebuilder-cc4f8.appspot.com",
          messagingSenderId: "930396395300",
          appId: "1:930396395300:web:b7c45a03f417de507b05b1",
          measurementId: "G-Z77H2NC0JQ"
        };
    }
  };
