import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import ResumeBuilder from './app';


import AuthController from './controllers/auth.controller';
import UserController from './controllers/user.controller';
import TemplateController from './controllers/template.controller';
import UserResumeController from './controllers/user.resume.controller';

const resumebuilder = new ResumeBuilder(
  [
    new AuthController(),
    new UserController(),
    new TemplateController(),
    new UserResumeController()
  ]
);
export const webApi = functions.https.onRequest(resumebuilder.main);