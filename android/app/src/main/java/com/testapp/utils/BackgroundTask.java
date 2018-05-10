package com.testapp.utils;


import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

import javax.annotation.Nullable;

public class BackgroundTask extends HeadlessJsTaskService {


    public int taskId;
    public static Intent serviceIntent;

    @Nullable
    @Override
    protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
//        serviceIntent = intent;
//        Bundle extras = intent.getExtras();
//        if (extras != null) {
        return new HeadlessJsTaskConfig(
                "HeadlessTask",
                null,
                0,
                false
        );
//        }
//        return null;
    }

    @Override
    public void onDestroy() {
        Log.d("BackgroundTask", "before onDestroy");
        super.onDestroy();
        Log.d("BackgroundTask", "onDestroy");
    }

    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Log.d("BackgroundTask", "before onTaskRemoved");
        super.onTaskRemoved(rootIntent);
        Log.d("BackgroundTask", "onTaskRemoved");
    }

    @Override
    public void onHeadlessJsTaskStart(int taskId) {
        Log.d("BackgroundTask", "onHeadlessJsTaskStart " + taskId);
        super.onHeadlessJsTaskStart(taskId);
        this.taskId = taskId;
        Log.d("BackgroundTask", "onHeadlessJsTaskStart");
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        Log.d("BackgroundTask", "onBind");
        return super.onBind(intent);
    }

    @Override
    protected void startTask(HeadlessJsTaskConfig taskConfig) {
        Log.d("BackgroundTask", "startTask");
        super.startTask(taskConfig);
        Log.d("BackgroundTask", "startTask");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d("BackgroundTask", "onStartCommand id:" + startId + " taskId: " + taskId);
//        showProcesses();
//        if (intent != null) {
//            if (!Arguments.fromBundle(intent.getExtras()).getBoolean("hasInternet")) {
//                Log.d("BackgroundTask", "onStartCommand --- !hasInternet");
//                stopSelf(startId);
////            showProcesses();
//                return START_NOT_STICKY;
//            }
//        }
        if (!XMPPReceiver.isNetworkAvailable(this)) {
            stopSelf(startId);
            return START_NOT_STICKY;
        }
        super.onStartCommand(intent, flags, startId);
        return START_STICKY;
    }


    private void showProcesses() {
        Log.d("BackgroundTask", "showProcesses:::");
        ActivityManager manager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            Log.d("XMPPReceiver", "Running Service: " + service.service.getClassName());
        }
    }
}
