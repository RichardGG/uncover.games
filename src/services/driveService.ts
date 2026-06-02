import axios from 'axios';
import type { ResponseType } from 'axios';

const DRIVE_BASE_URL = 'https://www.googleapis.com/drive/v3';

export type FileMetadata = {
  size: string;
  id: string;
  name: string;
  createdTime: string;
  modifiedTime: string;
};

export type ListResponse = {
  nextPageToken: string;
  files: Array<FileMetadata>;
};

export function getDriveAbout(
  apiToken: string
) {
  return axios.get(`${DRIVE_BASE_URL}/about`, {
    params: {
      fields: 'storageQuota',
    },
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
}

export function getDriveFile(
  apiToken: string,
  fileId: string,
  responseType: ResponseType | undefined = undefined
) {
  return axios.get(`${DRIVE_BASE_URL}/files/${fileId}`, {
    params: {
      alt: 'media',
    },
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
    responseType: responseType,
  });
}

export function fetchFilesList(
  apiToken: string,
  files: Array<FileMetadata> = [],
  pageToken: string | null = null
): Promise<Array<FileMetadata>> {
  // Loads all pages of files
  return axios
    .get(`${DRIVE_BASE_URL}/files`, {
      params: {
        spaces: 'appDataFolder',
        fields: 'files(id,name,size,createdTime,modifiedTime),nextPageToken',
        pageSize: 1000,
        pageToken: pageToken,
      },
      headers: {
        Authorization: 'Bearer ' + apiToken,
      },
    })
    .then(async ({ data }) => {
      // Add files to files array
      const response: ListResponse = data;
      files = files.concat(response.files);

      // Fetch the next page if available
      if (response.nextPageToken) {
        return await fetchFilesList(apiToken, files, response.nextPageToken);
      }

      // Final page, return the entire list of files
      return files;
    });
}
