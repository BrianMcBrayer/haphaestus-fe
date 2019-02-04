import { environment } from 'src/environments/environment';

export interface Config {
  BaseUrl: string;
}

export default <Config> {
  BaseUrl: environment.baseUrl
};
