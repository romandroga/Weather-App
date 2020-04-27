import axios from "axios";

export default {
  endpoint: "https://api.openweathermap.org",
  apiKey: "87cf27700817ed4e92adafa080b190b6",
  _query: null,
  _temperatureUnit: "units=metric",

  async fetchForecast() {
    const queryString = `${this.endpoint}/data/2.5/forecast?q=${this._query}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },

  get temperatureUnit() {
    return this._temperatureUnit;
  },

  set temperatureUnit(value) {
    this._temperatureUnit = value;
  },

  get query() {
    this._query;
  },

  set query(value) {
    this._query = value;
  },
};
