import { defineStore } from 'pinia';

export type GoogleAuthState = {
  token: string | null;
};

export const useGoogleAuthStore = defineStore('googleAuth', {
  state: () => {
    return {
      token: null,
    } as GoogleAuthState;
  },

  actions: {
    startAuth() {
      const url =
        'https://accounts.google.com/o/oauth2/v2/auth' +
        '?client_id=' +
        process.env.DRIVE_CLIENT_ID +
        '&redirect_uri=' +
        process.env.BASE_URL +
        '/website/callback' +
        '&response_type=token' +
        '&scope=https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/youtube.readonly';

      window.location.href = url;
    },
    saveToken(token: string) {
      this.token = token;
    },
    getToken(): string {
      if (!this.token) {
        this.startAuth();
        throw Error('No token available, redirecting to Google Auth');
      }
      return this.token;
    },
  },
});
