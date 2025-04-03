import axios from 'axios'

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
  googleApiToken: string,
  searchTerm: string
) {
  // https://developers.google.com/youtube/v3/docs/search/list
  return axios
    .get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: searchTerm,
        type: 'video',
        videoEmbeddable: true,
        part: 'id',
      },
      headers: {
        Authorization: 'Bearer ' + googleApiToken,
      },
    })
    .then(({ data }) => {
      const response: YouTubeSearchResponse = data
      return response.items[0]?.id?.videoId
    })
}
