import { admin } from "../../../../firebase-admin.config"; 

export async function POST(request) {
  const { token, title, body, extraData } = await request.json();
  console.log(token, title, body, extraData);

  const message = {
    token,
    notification: {
      title,
      body,  
    },
    data: extraData ? extraData : null,
  };

  try {
    // FCM üzerinden bildirimi gönder
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return new Response(JSON.stringify({ success: true, response }), { status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
