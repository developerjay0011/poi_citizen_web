// "use client";
// import { useEffect, useState } from 'react';
// import { getMessaging, getToken } from 'firebase/messaging';
// import firebaseApp from '../firebase/firebase';
// import { setCookie } from "cookies-next";
// import { CITIZEN_FCM_TOKEN_KEY, CITIZEN_IP } from '@/constants/common';

// const useFcmToken = () => {
//     const [token, setToken] = useState('');
//     const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('');

//     useEffect(() => {
//         const retrieveToken = async () => {
//             try {
//                 if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
//                     const messaging = getMessaging(firebaseApp);

//                     // Retrieve the notification permission status
//                     const permission = await Notification.requestPermission();
//                     setNotificationPermissionStatus(permission);
//                     // Check if permission is granted before retrieving the token
//                     fetch('https://api.ipify.org?format=json')
//                         .then(response => response.json())
//                         .then(data => {
//                             if (data.ip) {
//                                 setCookie(CITIZEN_IP, JSON.stringify(data.ip))
//                             }
//                         }).catch(error => console.error('Error fetching IP address:', error));

//                     if (permission === 'granted') {
//                         const currentToken = await getToken(messaging, {
//                             vapidKey: 'BNYsk1NtajjgTAMxMluwiJFJb0lY_FmjJ7gkwR-XikS6tRtm_MPwWQk6k965NpKAKqdouhmfeQJ1nVHcmUqF5cs',
//                         });
//                         if (currentToken) {
//                             setToken(currentToken);
//                             console.log(currentToken)
//                             setCookie(CITIZEN_FCM_TOKEN_KEY, JSON.stringify(currentToken))
//                         } else {
//                             console.log(
//                                 'No registration token available. Request permission to generate one.'
//                             );
//                         }
//                     }
//                 }
//             } catch (error) {
//                 console.log('An error occurred while retrieving token:', error);
//             }
//         };

//         retrieveToken();
//     }, []);

//     return { fcmToken: token, notificationPermissionStatus };
// };

// export default useFcmToken;