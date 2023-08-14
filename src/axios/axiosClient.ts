import axios from 'axios';
import getBaseUrl from './baseUrl';
import {getJwt} from './jwt';

const client = axios.create({
	baseURL: getBaseUrl(),
});

client.interceptors.request.use(
	async (config) => {
		const tokens = getJwt();
		if (!tokens) return config;
		config.headers.Authorization = `Bearer ${tokens.access}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default client;
