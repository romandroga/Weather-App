import axios from "axios";

const baseUrl = "https://pixabay.com/api";
const apiKey = "13689220-f8624404383f6a2586dfba74c";

export default {
  query: "",

  axiosSity() {
    const requestParams = `/?image_type=photo&sity&q=${this.query}&per_page=20&key=${apiKey}`;
    return axios.get(`${baseUrl}${requestParams}`).then((res) => {
      return res.data.hits;
    });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },
};
