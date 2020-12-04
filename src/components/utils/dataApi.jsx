import axios from 'axios';

const fetchDataWithQuery = (query, page) => {
  const TOKEN = '18971194-a8d2923dd41b567bba7e5ae77';
  return axios
    .get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${TOKEN}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default { fetchDataWithQuery };
