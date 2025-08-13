import { IAnimeService } from '../../core/services/anime-service';
import { JikanApiResponse } from '../../core/domain/types';
import apiClient from '../http/axios';

export class JikanRepository implements IAnimeService {
  async getTopAnime(page: number, itemsPerPage: number): Promise<JikanApiResponse> {
    try {
      const response = await apiClient.get<JikanApiResponse>(
        `/top/anime?page=${page}&limit=${itemsPerPage}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching top anime for page ${page}:`, error);
      throw new Error('Failed to fetch data from Jikan API.');
    }
  }
}
