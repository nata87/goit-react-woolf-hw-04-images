import axios from 'axios';

const API_KEY = '42274052-b5209bd40b827282c0377ed93';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export function getPhotoGallery(query, page, perPage) {
  return axios.get('', {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: perPage,
    },
  });
}
