'use client';

import { useEffect, useState, useRef } from 'react';

let rtc = {
  // For the local audio and video tracks.
  localAudioTrack: null,
  localVideoTrack: null,
  client: null,
};

let options = {
  appId: "4cc7a85443014303bb31372a087ec038",
  channel: "test-channel",
  // Use a temp token
  token: null,
  // Uid
  uid:  Math.floor(Math.random() * 10000).toString(),
};

const VideoCall = () => {
  const [client, setClient] = useState(null); // Agora istemcisi
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null); // Ses kanalı için ekledik
  const [joined, setJoined] = useState(false);

  const localPlayerRef = useRef(null);
  const remotePlayerRef = useRef(null);

  // Agora istemcisini başlatma ve olayları dinleme
  useEffect(() => {
    if (!window) {
      return;
    }
    const initClient = async () => {
      try {
        const AgoraRTC = (await import('agora-rtc-sdk-ng')).default 
        const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        rtc.client = agoraClient;
        setClient(agoraClient); 

        // Olayları dinle
        agoraClient.on('user-published', handleUserPublished);
        agoraClient.on('user-unpublished', handleUserUnpublished);
        console.log('Agora client initialized.');
      } catch (error) {
        console.error('Error initializing Agora client:', error);
      }
    };

    initClient();

    // Cleanup function: sayfa kapatılırken Agora istemcisini temizler
    return () => {
      if (client) {
        client.removeAllListeners(); // Bütün dinleyicileri temizle
        if (joined) {
          client.leave(); // Kanaldan çık
        }
      }
    };
  }, [ joined]); // client veya joined state'i değiştiğinde çalışır

  // Kanala katılma işlemi
  const joinChannel = async () => {
    if (!rtc.client) {
      console.error('Agora client is not initialized yet.');
      return;
    }

    try {
      // Kanala katıl
      const uid = await rtc.client.join(options.appId, options.channel, options.token, options.uid);
      console.log(`User ${uid} joined channel ${options.channel}`);

      // Kamera ve mikrofon yollarını oluşturma
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      // Yerel videoyu kaydet ve ekrana yansıt
      setLocalVideoTrack(videoTrack);
      setLocalAudioTrack(audioTrack); // Ses kanalını da kaydediyoruz
      videoTrack.play(localPlayerRef.current);

      // Ses ve video yollarını yayınla
      await rtc.client.publish([videoTrack, audioTrack]);
      setJoined(true);
    } catch (error) {
      console.error('Error joining the channel:', error);
    }
  };

  // Kanaldan ayrılma işlemi
  const leaveChannel = async () => {
    if (!rtc.client || !joined) return;

    try {
      // Yayını durdur ve kanaldan ayrıl
      if (localVideoTrack) {
        localVideoTrack.stop();
        localVideoTrack.close();
      }

      if (localAudioTrack) {
        localAudioTrack.stop();
        localAudioTrack.close();
      }

      await rtc.client.leave();

      console.log('Left the channel.');

      // Temizlik işlemi
      setJoined(false);
      setLocalVideoTrack(null);
      setLocalAudioTrack(null);

      // DOM'u temizle
      if (localPlayerRef.current) {
        localPlayerRef.current.innerHTML = ''; // Yerel video alanını temizle
      }
      if (remotePlayerRef.current) {
        remotePlayerRef.current.innerHTML = ''; // Uzak video alanını temizle
      }
    } catch (error) {
      console.error('Error leaving the channel:', error);
    }
  };

  // Diğer kullanıcıların yayınını yönetme
  const handleUserPublished = async (user, mediaType) => {
    if (!rtc.client) {
      console.error('Agora client is not initialized yet.');
      return;
    }

    console.log(`User ${user.uid} published ${mediaType}`);
    try {
      // Yayına abone olun
      await rtc.client.subscribe(user, mediaType);

      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        const playerContainer = document.createElement('div');
        playerContainer.id = user.uid;
        remotePlayerRef.current.appendChild(playerContainer);
        remoteVideoTrack.play(playerContainer);
        console.log(`User ${user.uid}'s video is playing.`);
      }

      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play(); // Sesi oynat
        console.log(`User ${user.uid}'s audio is playing.`);
      }
    } catch (error) {
      console.error('Error subscribing to user stream:', error);
    }
  };

  // Kullanıcı kanaldan çıkarsa tetiklenen fonksiyon
  const handleUserUnpublished = (user) => {
    console.log(`User ${user.uid} unpublished.`);

    const playerContainer = document.getElementById(user.uid);
    if (playerContainer) {
      playerContainer.remove();
    }
  };

  return (
    <div>
      <h1>Agora Video Call</h1>
      <div>
        {joined ? (
          <button onClick={leaveChannel}>Leave</button>
        ) : (
          <button onClick={joinChannel}>Join</button>
        )}
      </div>
      <div>
        <h2>Local Stream</h2>
        <div
          id="local-player"
          ref={localPlayerRef}
          style={{ width: '640px', height: '480px', backgroundColor: 'black' }}
        ></div>
      </div>
      <div>
        <h2>Remote Streams</h2>
        <div
          id="remote-players"
          ref={remotePlayerRef}
          style={{ display: 'flex', flexWrap: 'wrap' }}
        ></div>
      </div>
    </div>
  );
};

export default VideoCall;
