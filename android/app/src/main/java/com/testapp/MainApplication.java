package com.testapp;

import android.app.Application;
import android.util.Log;

import com.RNFetchBlob.RNFetchBlobPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.facebook.react.ReactApplication;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

import in.sriraman.sharedpreferences.RNSharedPreferencesReactPackage;
import rnxmpp.RNXMPPPackage;


public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            Log.d("MainApplication", "getPackages");
            return Arrays.<ReactPackage>asList(new MainReactPackage(),
            new RNI18nPackage(),
                    new RNFetchBlobPackage(),
                    new SplashScreenReactPackage(),
                    new MyReactPackage(),
                    new RNSharedPreferencesReactPackage(),
                    new ReactNativePushNotificationPackage(),
                    new RNXMPPPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("MainApplication", "onCreate");
        SoLoader.init(this, /* native exopackage */ false);
    }


    @Override
    public void onTerminate() {
        Log.d("MainApplication", "APP onTerminate");
        super.onTerminate();
//        stopService(serviceIntent);
    }


}