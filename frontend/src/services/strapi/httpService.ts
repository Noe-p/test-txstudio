import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface HttpError extends Error {
  data?: unknown;
  status?: number;
  statusText?: string;
}

class HTTPService {
  private httpUrl: AxiosInstance | null;
  private baseURL: string;
  private timeout: number;
  private token: string;

  constructor() {
    this.httpUrl = null;
    this.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
    this.timeout = process.env.NEXT_PUBLIC_API_TIMEOUT
      ? +process.env.NEXT_PUBLIC_API_TIMEOUT
      : 60000;
    this.token = '';
  }

  public setToken(token: string): void {
    this.token = token;
    this.httpUrl = null;
  }

  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.call<T>('get', url, config);
  }

  public async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.call<T>('post', url, data, config);
  }

  public async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.call<T>('patch', url, data, config);
  }

  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.call<T>('delete', url, config);
  }

  public async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.call<T>('put', url, data, config);
  }

  private async call<T>(
    method: 'get' | 'post' | 'patch' | 'delete' | 'put',
    ...args: [string, ...unknown[]]
  ): Promise<AxiosResponse<T>> {
    if (!this.httpUrl || Object.keys(this.httpUrl).length === 0) {
      this.httpUrl = this.createNewAxios();
    }
    const myAxiosInstance = this.httpUrl;

    try {
      const response = await myAxiosInstance[method]<T>(...(args as [string]));
      return response;
    } catch (error) {
      // Si c'est une erreur HTTP, la propager
      if (error instanceof Error) {
        throw error;
      }
      // Sinon, créer une nouvelle erreur
      throw new Error('An unexpected error occurred');
    }
  }

  private createNewAxios(): AxiosInstance {
    const headers: Record<string, string> = {};

    if (this.token && this.token !== '') {
      headers.Authorization = `Bearer ${this.token}`;
    }

    if (process.env.NEXT_PUBLIC_API_KEY) {
      headers['x-api-key'] = process.env.NEXT_PUBLIC_API_KEY;
    }

    return axios.create({
      headers,
      baseURL: this.baseURL,
      transformResponse: [(data: string) => this.handleResponse(data)],
      timeout: this.timeout,
      validateStatus: (status: number) => status >= 200 && status < 500,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
  }

  private handleResponse(response: string): unknown {
    if (!response) return {};
    const parsed = JSON.parse(response) as {
      data?: unknown;
      error?: { status?: number; name?: string; message?: string; details?: unknown };
    };

    // Si la réponse contient une erreur Strapi, la lancer
    if (parsed.error) {
      const error: HttpError = new Error(parsed.error.message || 'An error occurred');
      error.data = parsed.error;
      if (parsed.error.status !== undefined) {
        error.status = parsed.error.status;
      }
      throw error;
    }

    return parsed;
  }
}

export const HttpService = new HTTPService();
