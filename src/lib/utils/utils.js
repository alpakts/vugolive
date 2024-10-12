export const  timeAgo = (messageTime)=> {
    const now = new Date();
    const messageDate = new Date(messageTime);
  
    const seconds = Math.floor((now - messageDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30); // Kabaca bir hesaplama
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return 'Şimdi';
    } else if (minutes < 60) {
      return `${minutes} dakika önce`;
    } else if (hours < 24) {
      return `${hours} saat önce`;
    } else if (days === 1) {
      return 'Dün';
    } else if (days < 7) {
      return `${days} gün önce`;
    } else if (weeks === 1) {
      return '1 hafta önce';
    } else if (weeks < 5) {
      return `${weeks} hafta önce`;
    } else if (months === 1) {
      return '1 ay önce';
    } else if (months < 12) {
      return `${months} ay önce`;
    } else if (years === 1) {
      return '1 yıl önce';
    } else {
      return `${years} yıl önce`;
    }
  }