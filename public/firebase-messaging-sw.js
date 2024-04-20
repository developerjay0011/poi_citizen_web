// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");;
const firebaseConfig = {
    apiKey: "AIzaSyCq9K0cFvgrYnKQWpFvfn0UD32TediDW_s",
    authDomain: "politicians-of-india-cddc0.firebaseapp.com",
    projectId: "politicians-of-india-cddc0",
    storageBucket: "politicians-of-india-cddc0.appspot.com",
    messagingSenderId: "202603457478",
    appId: "1:202603457478:web:8e0928b430cb8ee4fde0c7",
    measurementId: "G-G9JW6ENMNZ"
};

// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    try {
        console.log('onBackgroundMessage:', payload);
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            data: payload?.data
        };
        self.registration.showNotification(notificationTitle, notificationOptions);
    } catch (error) {
        console.error(error)
    }
});
const ProtectedRoutes = {
    user: "/user",
    userProfile: "/user/profile",
    complaints: '/user/profile/complaints',
    requests: '/user/profile/requests',
    suggestions: '/user/profile/suggestions',
    contributions: '/user/profile/contributions',
};

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const notification = event.notification;
    const data = notification.data;
    const type = data?.type;
    const dev = true;
    const url = dev ? "http://localhost:3000" : "https://citizen.politicianofindia.com:4006"
    try {
        if (type) {
            let urlToOpen = ProtectedRoutes.user
            if (type === "post_timeline") {
                urlToOpen = ProtectedRoutes.user + "?type=" + type + "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
            } else if (type === "new_post" || type === "development" || type === "agenda" || type === "poll") {
                urlToOpen = ProtectedRoutes.user
            } else if (type === "complaint_status" || type === "suggestion_status" || type === "request_status") {
                if (data?.type === "complaint_status") {
                    urlToOpen = ProtectedRoutes.complaints + "?type=" + type + "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
                } else if (data?.letter_type === "suggestion_status") {
                    urlToOpen = ProtectedRoutes.suggestions + "?type=" + type + "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
                } else if (data?.letter_type === "request_status") {
                    urlToOpen = ProtectedRoutes.requests + "?type=" + type + "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
                } else {
                    urlToOpen = ProtectedRoutes.contributions + "?type=" + type + "&referenceid=" + data?.referenceid + "&leaderid=" + data?.leaderid
                }
            }
            event.waitUntil(clients.openWindow(urlToOpen ? url + urlToOpen : url));
        } else {
            event.waitUntil(clients.openWindow(url));
        }
    } catch (error) {
        event.notification.close();
        console.error(error);
    }
    event.notification.close();
});