var XMPP = require("react-native-xmpp");
var PushNotification = require("react-native-push-notification");
import { DeviceEventEmitter } from "react-native"
import { testExport, sendMessage } from "../Chat/actions/conversation"



const mUsername = "";
const mPassword = "";



export const setupListeners = (allowNotifications = false, resolve, reject) => {
    XMPP.removeListeners();
    addMessageReceiver((body) => {
        console.log("ALLOW NOTIFICATIONS CALLBACK");
        console.log(body);
        if (allowNotifications) {
            console.log("TRUE");
            PushNotification.localNotification({
                title: body.user.username,
                message: body.messageType === "text" ? body.text : "Sticker"
            })
        }
    });

    XMPP.on("iq", (message) => console.log("BACKGROUND IQ:" + JSON.stringify(message)));
    XMPP.on("roster", (message) => {
        console.log("BACKGROUND ROSTER:" + JSON.stringify(message));
    })
    XMPP.on("presence", (message) => {
        console.log("BACKGROUND PRESENCE:" + JSON.stringify(message));
    });
    XMPP.on("error", (message) => console.log("BACKGROUND ERROR:" + message));
    XMPP.on("disconnect", (message) => {
        console.log("BACKGROUND DISCONNECTED!");
        XMPP.isConnected = false;
        XMPP.isLogged = false;
        XMPP.removeListeners();
        console.log(message);
        console.log(XMPP);
        if (message) {
            XMPP.disconnect();
        }

        resolve("disconnect");

    });

    XMPP.on("loginError", (message) => {
        console.log("BACKGROUND loginError");
    });

    XMPP.on("login", (message) => {
        console.log("BACKGROUND login");
        XMPP.isLogged = true;
    });
    XMPP.on("connect", (message) => {
        console.log("BACKGROUND CONNECTED");
        XMPP.isConnected = true;
        console.log(XMPP);
    });

    DeviceEventEmitter.addListener("enableInternet", (e) => {
        console.log("Internet enabled");
        setupListeners();
        console.log(mUsername, mPassword);
        connect(mUsername, mPassword);
    });

    DeviceEventEmitter.addListener("disableInternet", (e) => {
        console.log("Interet disabled");
        removeListeners();
        disconnect();
    })

    XMPP.trustHosts(["brusneve-l"]);

}

export const addMessageReceiver = (callback) => {
    XMPP.removeListener("message");
    XMPP.on("message", (message) => {
        console.log("BACKGROUND MESSAGE");
        var receive = JSON.parse(message.body);
        callback(receive.newMessage);
    })

}



export const connect = async (username, password, allowNotifications = false) => {
    mUsername = username;
    mPassword = password;
    var test = await new Promise(
        (resolve, reject) => {
            XMPP.disconnect();
            setupListeners(allowNotifications, resolve, reject);
            XMPP.connect(username + "@brusneve-l", password);
        }
    )
}

export const disconnect = () => {
    XMPP.disconnect();
}

export const sendXMPPMessage = (text, to) => {
    var validText = JSON.stringify(text);
    console.log(validText);
    XMPP.message(validText, to + "@brusneve-l");
}

export const removeListeners = () => {
    XMPP.removeListeners();
}
