import { defineStore } from 'pinia'
import axios from 'axios'

export type DriveState = {
  token: string|null,
}

export type File = {
  size: string,
  id: string,
  name: string,
  createdTime: string,
  modifiedTime: string,
}

export type ListResponse = {
  nextPageToken: string,
  files: Array<File>,
}

const DRIVE_BASE_URL = 'https://www.googleapis.com/drive/v3/files'

export const useDriveStore = defineStore('drive', {
  state: () => ({
    token: null,
  } as DriveState),

  actions: {
    startAuth() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth'
        + '?client_id=' + process.env.DRIVE_CLIENT_ID
        + '&redirect_uri=' + process.env.BASE_URL + '/website/callback'
        + '&response_type=token'
        + '&scope=https://www.googleapis.com/auth/drive.appdata'

        window.location.href = url
    },
    saveToken(token: string) {
      this.token = token
    },
    listFiles(files:Array<File> = [], pageToken:string|null = null): Promise<Array<File>> {
      // Loads all pages of files
      return axios.get(DRIVE_BASE_URL, {
        params: {
          spaces: 'appDataFolder',
          fields: 'files(id,name,size,createdTime,modifiedTime),nextPageToken',
          pageSize: 1000,
          pageToken: pageToken,
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      })
      .then(({ data }) => {
        const response:ListResponse = data
        files = files.concat(response.files)
        if (response.nextPageToken) {
          return this.listFiles(files, response.nextPageToken)
        }
        return files
      })
    },
    getFile(fileId: string, customOptions: any = {}) {
      const options = {
        params: {
          alt: 'media'
        },
        headers: {
          Authorization: 'Bearer ' + this.token
        }
      }

      return axios.get(`${DRIVE_BASE_URL}/${fileId}`, Object.assign(options, customOptions))
    },
  }
})