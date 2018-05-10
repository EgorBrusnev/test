package com.testapp.utils;


import android.app.IntentService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.util.Log;

import java.util.Timer;
import java.util.TimerTask;


public class FirstService extends IntentService {

    private int counter = 0;
    private BroadcastReceiver receiver;

    private boolean isRunning;
    private Context context;
    private Thread backgroundThread;
    private int startId;

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        Log.d("FirstService", "onHandleIntent");
    }

    public FirstService() {
        super("myname");
    }

    /*public FirstService(Context ctx) {
        super();
        Log.d("FirstService", "i m here");
    }

    public FirstService() {
    }*/


    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d("FirstService", "onCreate");

//        HandlerThread thread = new HandlerThread("ServiceStartArguments", Process.THREAD_PRIORITY_BACKGROUND);
//        thread.start();
//        mServiceLooper = thread.getLooper();
//        mServiceHandler = new ServiceHandler(mServiceLooper);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        super.onStartCommand(intent, flags, startId);
        Log.d("FirstService", "onStartCommand");
        startTimer();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.i("FirstService", "onDestroy");
//        Intent broadcastIntent = new Intent("RestartSensor");
//        sendBroadcast(broadcastIntent);
        stopTimerTask();
    }


    @Override
    public void onTaskRemoved(Intent rootIntent) {
        Log.i("FirstService", "before onTaskRemoved");
        super.onTaskRemoved(rootIntent);
//        unregisterReceiver(receiver);
        Log.i("FirstService", "after onTaskRemoved");
//        Intent broadcastIntent = new Intent(".ActivityRecognition.RestartSensor");
//        sendBroadcast(broadcastIntent);
//        stopTimerTask();
    }

    private Timer timer;
    private TimerTask timerTask;

    public void startTimer() {
        timer = new Timer();
        initializeTimerTask();
        timer.schedule(timerTask, 1000, 1000);
    }

    public void initializeTimerTask() {
        timerTask = new TimerTask() {
            @Override
            public void run() {
                Log.i("FirstService", "in timer ++++  " + (counter++));
                stopSelf(startId);
            }
        };
    }

    public void stopTimerTask() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
    }

}
