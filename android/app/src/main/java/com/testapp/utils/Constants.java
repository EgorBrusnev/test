package com.testapp.utils;


public class Constants {
    public interface ACTION {
        public static String MAIN_ACTION = "com.testapp.firstservice.action.main";
        public static String PREV_ACTION = "com.testapp.firstservice.action.prev";
        public static String PLAY_ACTION = "com.testapp.firstservice.action.play";
        public static String NEXT_ACTION = "com.testapp.firstservice.action.next";
        public static String STARTFOREGROUND_ACTION = "com.testapp.firstservice.action.startforeground";
        public static String STOPFOREGROUND_ACTION = "com.testapp.firstservice.action.stopforeground";
    }

    public interface NOTIFICATION_ID {
        public static int FOREGROUND_SERVICE = 101;
    }
}
