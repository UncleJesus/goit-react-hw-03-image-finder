import axios from 'axios';

const getData = function(query, page) {

    return axios.get(`https://pixabay.com/api/?key=18951897-f7110a11ebc58b866f93acf70&q=${query}&image_type=photo&page=${page}&orientation=horizontal&per_page=12`)

};

export default getData;