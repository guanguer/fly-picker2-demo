import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {install as offlineInstall} from 'offline-plugin/runtime'

import { AppModule } from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
  offlineInstall();
}

platformBrowserDynamic().bootstrapModule(AppModule);
