"use client";
import { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import firebaseApp from './firebase';
import useFcmToken from '../hooks/useFcmToken';
import { ProtectedRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { GetRaisedComplaints } from '@/redux_store/complaints/complaintsApi';
import { GetRaisedRequests } from '@/redux_store/requests/requestAPI';
import { requestActions } from '@/redux_store/requests/requestSlice';
import { complaintActions } from '@/redux_store/complaints/complaintSlice';
import { GetSuggestions } from '@/redux_store/suggestions/suggestionAPI';
import { suggestionActions } from '@/redux_store/suggestions/suggestionSlice';
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks';
import { GetPostsForCitizen } from '@/redux_store/post/postApi';
import { postActions } from '@/redux_store/post/postSlice';
import { getCookie } from 'cookies-next';
import { CITIZEN_USER_INFO } from '@/constants/common';

export default function Notificationpage() {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const router = useRouter();
    const dispatch = cusDispatch();
    let userDetails: any = getCookie(CITIZEN_USER_INFO);
    userDetails = userDetails && JSON.parse(userDetails);
    const Getdata = async (type: any, data: any) => {
        if (type === "post_timeline") {
            const PostsForCitizen = await GetPostsForCitizen(userDetails?.id);
            if (PostsForCitizen?.length > 0) { dispatch(postActions.setPost(PostsForCitizen)); }
        } else if (type === "new_post" || type === "development" || type === "agenda" || type === "poll") {
            const PostsForCitizen = await GetPostsForCitizen(userDetails?.id);
            if (PostsForCitizen?.length > 0) { dispatch(postActions.setPost(PostsForCitizen)); }
        } else if (type === "complaint_status" || type === "suggestion_status" || type === "request_status") {
            if (data?.type === "complaint_status") {
                const data = await GetRaisedComplaints(userDetails?.id);
                if (data.length > 0) { dispatch(complaintActions.storeComplaints(data)); }
            } else if (data?.letter_type === "suggestion_status") {
                const Suggestions = await GetSuggestions(userDetails?.id);
                if (Suggestions.length > 0) { dispatch(suggestionActions.storeSuggestions(Suggestions)); }
            } else if (data?.letter_type === "request_status") {
                const RaisedRequests = await GetRaisedRequests(userDetails?.id);
                if (RaisedRequests.length > 0) { dispatch(requestActions.storeRequest(RaisedRequests)); }
            } else {
            }
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload: any) => {
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                    body: payload.notification.body,
                    data: payload?.data ? payload?.data : {}
                };
                Getdata(payload?.data?.type, payload?.data)
                var notification = new Notification(notificationTitle, notificationOptions);
                notification.onclick = async function (event: any) {
                    event.preventDefault();
                    const data = payload?.data
                    const type = data?.type;
                    const referenceid = data?.referenceid;
                    const leaderid = data?.leaderid;
                    try {
                        if (type) {
                            let urlToOpen = ProtectedRoutes.user
                            if (type === "post_timeline") {
                                urlToOpen = ProtectedRoutes.user + "?type=" + type + "&referenceid=" + referenceid + "&leaderid=" + leaderid
                            } else if (type === "new_post" || type === "development" || type === "agenda" || type === "poll") {
                                urlToOpen = ProtectedRoutes.user
                            } else if (type === "complaint_status" || type === "suggestion_status" || type === "request_status") {
                                if (data?.type === "complaint_status") {
                                    urlToOpen = ProtectedRoutes.complaints + "?type=" + type + "&referenceid=" + referenceid + "&leaderid=" + leaderid
                                } else if (data?.letter_type === "suggestion_status") {
                                    urlToOpen = ProtectedRoutes.suggestions + "?type=" + type + "&referenceid=" + referenceid + "&leaderid=" + leaderid
                                } else if (data?.letter_type === "request_status") {
                                    urlToOpen = ProtectedRoutes.requests + "?type=" + type + "&referenceid=" + referenceid + "&leaderid=" + leaderid
                                } else {
                                    urlToOpen = ProtectedRoutes.contributions + "?type=" + type + "&referenceid=" + referenceid + "&leaderid=" + leaderid
                                }
                            }
                            router.replace(urlToOpen)
                        } else {
                            router.replace(ProtectedRoutes.user)
                        }
                    } catch (error) {
                        router.replace(ProtectedRoutes.user)
                    }
                    notification.close();
                };
            });
            return () => {
                unsubscribe();
            };
        }
    }, []);

    return null;
}