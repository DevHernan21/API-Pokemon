export interface IPokemonResponse {
  next: string | null;
  previous: string | null;
  detailedResults: Array<IDetailedResult>;
}

export interface IDetailedResult {
  name: string;
  id: number;
  types: Array<string>;
  imageUrl: string;
  weight: number;
  abilities: Array<string>;
}

export interface IPokemonRawResponse {
  next: string | null;
  previous: string | null;
  results: Array<any>;
}