package com.testapp.utils;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.List;


public class XMPPReceiver extends BroadcastReceiver {

    public static Intent serviceIntent;

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("XMPPReceiver", "onReceive");
        boolean hasInternet = isNetworkAvailable(context);
        Log.d("XMPPReceiver", "HAS Internet: " + hasInternet);
        if (!isMyServiceRunning(BackgroundTask.class, context)) {
            Log.d("XMPPReceiver", "!isMyServiceRunning");
            if (!isAppOnForeground(context)) {
                Log.d("XMPPReceiver", "start Headless service");
                serviceIntent = new Intent(context, BackgroundTask.class);
                Log.d("XMPPReceiver", "hasInternet");
                serviceIntent.putExtra("hasInternet", hasInternet);
                context.startService(serviceIntent);
                HeadlessJsTaskService.acquireWakeLockNow(context);
            } else {
                Log.d("XMPPReceiver", "isAppOnForeground");
                if (hasInternet) {
                    Log.d("XMPPReceiver", "send event");
                    WritableMap params = Arguments.createMap();
                    InternetConnectionModule.sendEvent("enableInternet", params);
                } else {
                    Log.d("XMPPReceiver", "send event disable inet");
                    WritableMap params = Arguments.createMap();
                    InternetConnectionModule.sendEvent("disableInternet", params);
                }
            }
        } else {
            Log.d("XMPPReceiver", "" +
                    "MyServiceRunning");
            if (!hasInternet) {
                Log.d("XMPPReceiver", "!hasInternet");
                context.stopService(new Intent(context, BackgroundTask.class));
            }
        }
    }


    private boolean isMyServiceRunning(Class<?> serviceClass, Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
//            Log.d("XMPPReceiver", "Running Service: " + service.service.getClassName());
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAppOnForeground(Context context) {
        ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        List<ActivityManager.RunningAppProcessInfo> appProcesses =
                activityManager.getRunningAppProcesses();
        if (appProcesses == null) {
            return false;
        }
        final String packageName = context.getPackageName();
        for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
            if (appProcess.importance ==
                    ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
                    appProcess.processName.equals(packageName)) {
                return true;
            }
        }
        return false;
    }


    public static boolean isNetworkAvailable(Context context) {
        ConnectivityManager manager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo info = manager.getActiveNetworkInfo();
        return (info != null && info.isConnected());
    }
}
