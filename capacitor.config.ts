import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RyderFleetDropOff',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    SplashScreen:{
      launchAutoHide: false,
      splashFullScreen: true
    }
  }
};

export default config;
