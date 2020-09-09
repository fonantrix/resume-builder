import * as firebase from 'firebase';
import { config } from "./../config/config";

firebase.initializeApp(config());
export {firebase} 

