import dayjs from 'dayjs';
import { defineStore } from 'pinia';

export type GoogleAuthState = {
  authenticated: boolean;
  token: string | null;
  lastRefreshed: string | null;
};

export const useGoogleAuthStore = defineStore('googleAuth', {
  state: () => {
    return {
      authenticated: false,
      token: null,
    } as GoogleAuthState;
  },

  actions: {
    init() {
      const storeJson = window.localStorage.getItem('googleAuthStore');
      if (storeJson) {
        const previousState = JSON.parse(storeJson)
        this.authenticated = previousState.authenticated
      }

      // On state change, update local storage
      this.$subscribe((_mutation, state) => {
        console.log('GoogleAuthStore state changed, updating localStorage')
        window.localStorage.setItem(
          'googleAuthStore',
          JSON.stringify({
            // Only persist authenticated state, token is stored in memory only due to short lifespan and security concerns
            authenticated: state.authenticated,
          })
        )
      })
    },
    startAuth() {
      // TODO this should be a modal or something
      const url =
        'https://accounts.google.com/o/oauth2/v2/auth' +
        '?client_id=' +
        import.meta.env.VITE_DRIVE_CLIENT_ID +
        '&redirect_uri=' +
        import.meta.env.VITE_BASE_URL +
        '&response_type=token' +
        '&scope=https://www.googleapis.com/auth/drive.appdata';
        // https://www.googleapis.com/auth/youtube.readonly

      window.location.href = url;
    },
    saveToken(token: string) {
      this.token = token;
      this.authenticated = true;

    },
    getToken(): string {
      if (!this.token) {
        this.startAuth();
        throw Error('No token available, redirecting to Google Auth');
      }
      return this.token;
    },
    resetToken(error: Error) {
      if (dayjs(this.lastRefreshed).isAfter(dayjs().subtract(1, 'minute'))) {
        alert('request failed: ' + error.message)
        return
      }
      this.lastRefreshed = dayjs().format('YYYY-MM-DD')
      this.token = null
      this.authenticated = false
      this.getToken()
    }
  },
});
