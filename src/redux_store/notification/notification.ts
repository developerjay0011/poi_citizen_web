import axios from "axios";
export const MapFcm = (tokens = [], removeown = false) => {
  var token = Array.isArray(tokens) ? [...tokens] : [] as any
  token = token?.map((item) => ({ token: item ? item : "" }))
  return token
}


export const Sendnoti = async (data?: any) => {
  var notification = {
    title: data?.title,
    body: data?.description,
    content_available: true,
    priority: "max",
    visibility: "public",
    android_channel_id: "Poi_Leader",
  }
  var datas = {
    referenceid: data?.referenceid ? data?.referenceid : "",
    notificationid: data?.notificationid ? data?.notificationid : "",
    type: data?.type ? data?.type : data?.type
  }
  var sendnoti = true
  if (data?.tokens) {
    var tokens = data?.tokens?.map((item: any) => item.token)?.filter((item) => item != '');
    sendnoti = tokens?.length > 0 ? true : false
    var params = {
      registration_ids: tokens,
      notification: notification,
      data: datas
    }
    if (sendnoti) {
      await axios(`https://fcm.googleapis.com/fcm/send`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "key=" + "AAAALywba8Y:APA91bGen1HZo0W4AleELnByOO8JZIQxbVvGX1tCbqdFRCO2XMIPsyZAZXgR_FHp4MpmqQ4Gf45qcp0BEp4DFZ0-iTDSqFQ9E38mOItprnFlK5HIds963iv0_H2Xhwn0GTD0ofi9CGCZ",
        },
        data: params,
      }).then(async (response) => {
        console.log("Sendnotiresponse", { success: response?.data?.success, failure: response?.data?.failure })
      }).catch((error) => {
        console.log("Sendnotierror", error)
      });
    }
  }
};
