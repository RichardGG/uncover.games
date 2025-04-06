import { defineStore } from 'pinia';
import {
  getCachedData,
  needsRefresh,
  setCachedData,
} from '@/services/cacheService';
import {
  fetchFilesList,
  type FileMetadata,
  getDriveFile,
} from '@/services/driveService';
import type { LoadingStatus } from '@/types/LoadingStatusTypes';

export type DriveState = {
  files: Array<FileMetadata>;
  status: LoadingStatus;
};

export interface ProgressUpdate {
  (progress: number): void;
}

export const useDriveStore = defineStore('drive', {
  state: () => {
    return {
      files: [],
      status: {
        state: 'pending',
      },
    } as DriveState;
  },

  actions: {
    async init(googleApiToken: string) {
      // Fetch from cache
      this.status.state = 'loading-cache';
      const cachedResponse = await getCachedData('files', 'allFiles');
      if (cachedResponse) {
        // Store the cached files
        this.files = await cachedResponse.json();
      }

      this.status.state = 'downloading';
      const files = await fetchFilesList(googleApiToken);

      // Store the fetched files
      this.files = files;

      this.status.state = 'done';

      // Cache the fetched files
      setCachedData('files', 'allFiles', JSON.stringify(files));
    },

    getFileMetadata(name: string): FileMetadata | undefined {
      return this.files.find((file) => file.name === name);
    },

    async getImage(
      googleApiToken: string,
      fileName: string
    ): Promise<false | string> {
      const file = this.files.find(
        (file) => file.name === fileName?.replace('\\', '_')
      );

      if (!file) {
        return new Promise((resolve) => resolve(false));
      }

      const cachedResponse = await getCachedData('Images', fileName);

      // Return the cached data if it's still valid
      if (cachedResponse && !needsRefresh(file.modifiedTime, cachedResponse)) {
        return new Promise((resolve) =>
          cachedResponse.text().then((result) => {
            resolve(result);
          })
        );
      }

      try {
        const response = await getDriveFile(
          googleApiToken,
          file.id,
          'arraybuffer'
        );
        const dataUri =
          'data:image/jpeg;base64, ' +
          btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
        setCachedData('Images', fileName, dataUri);
        return new Promise((resolve) => resolve(dataUri));
      } catch {
        return new Promise((resolve) => resolve(false));
      }
    },
  },
});
