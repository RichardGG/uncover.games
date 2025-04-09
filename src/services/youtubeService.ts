import axios from 'axios'
import { useGoogleAuthStore } from '@/stores/googleAuthStore'

export type YouTubeIdData = {
  kind: string
  videoId: string
}

export type YouTubeItemData = {
  etag: string
  id: YouTubeIdData
  kind: string
}

export type YouTubeSearchResponse = {
  items: Array<YouTubeItemData>
}

export async function getYouTubeVideoId(
  searchTerm: string
) {
  const googleAuthStore = useGoogleAuthStore()

  // https://developers.google.com/youtube/v3/docs/search/list
  return axios
    .get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: searchTerm,
        type: 'video',
        videoEmbeddable: true,
        part: 'id',
        safeSearch: 'strict',
      },
      headers: {
        Authorization: 'Bearer ' + await googleAuthStore.getToken(),
      },
    })
    .then(({ data }) => {
      const response: YouTubeSearchResponse = data
      return response.items[0]?.id?.videoId
    })
    .catch((error) => {
      // TODO check error type
      googleAuthStore.resetToken(error)
    })
}
