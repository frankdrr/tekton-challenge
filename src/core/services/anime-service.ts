import { JikanApiResponse } from '../domain/types';

export interface IAnimeService {
  /**
   * Obtiene una lista paginada de animes.
   * @param page - El número de página a solicitar.
   * @param itemsPerPage - El número máximo de registros por solicitud, por defecto 25.
   */
  getTopAnime(page: number, itemsPerPage: number): Promise<JikanApiResponse>;
}
