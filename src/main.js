import "./assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";
import router from "./router";
import store from './store';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import "./assets/main.css";

import DOMPurify from 'dompurify';

// function initTrustedTypes() {
//     if (window.trustedTypes) {
//       try {
//         // Check if the policy already exists
//         if (!window.trustedTypes.getPolicy('default')) {
//           window.trustedTypes.createPolicy('default', {
//             createHTML: (input) => DOMPurify.sanitize(input), // Sanitize HTML
//             createScript: (input) => input,
//             createScriptURL: (input) => input,
//           });
//           console.log("Trusted Types policy 'default' created successfully.");
//         } else {
//           console.log("Trusted Types policy 'default' already exists.");
//         }
//       } catch (error) {
//         console.error("Error creating Trusted Types policy:", error);
//       }
//     } else {
//       console.warn("Trusted Types is not supported in this browser.");
//     }
//   }
  
 

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");
