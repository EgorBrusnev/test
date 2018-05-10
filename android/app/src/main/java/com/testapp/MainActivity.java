package com.testapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.testapp.utils.BackgroundTask;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
        boolean stop = this.stopService(new Intent(this, BackgroundTask.class));
        Log.d("MainActivity","STOPED? "+stop);
    }


    @Override
    protected void onDestroy() {
//        stopService(mServiceIntent);
  /*      Intent serviceIntent = new Intent(this, BackgroundTask.class);
        startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(this);*/
//        Log.d("FirstService", "MA onDestroy");
//        Intent broadcastIntent = new Intent("onActivityDestroy");
//        sendBroadcast(broadcastIntent);
        super.onDestroy();
    }

    public Context getContext() {
        return getApplicationContext();
    }

    @Override
    protected void onPause() {
        Log.d("MainActivity", "MA onPause");
        super.onPause();
    }

    @Override
    protected void onStop() {
//        stopService(XMPPReceiver.serviceIntent);
        super.onStop();
        Log.d("MainActivity", "MA onStop");
        Intent broadcastIntent = new Intent("onActivityDestroy");
        sendBroadcast(broadcastIntent);
    }


    @Override
    public boolean isDestroyed() {
        Log.d("MainActivity", "MA onDestroyedddd");
        return super.isDestroyed();
    }

    @Override
    public boolean isFinishing() {
        Log.d("MainActivity", "MA isFinishing");
        return super.isFinishing();
    }


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "testApp";
    }


}
