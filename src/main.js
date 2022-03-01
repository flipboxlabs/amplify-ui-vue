import { createApp } from 'vue'
import App from './App.vue'
import AmplifyVue from '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';

import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

createApp(App).use(AmplifyVue).mount('#app')
