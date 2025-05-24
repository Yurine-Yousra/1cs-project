import { PUBLIC_UNSPLASH } from "../lib/config";


export async function fetchNaturePhotos(page: number = 1, perPage: number = 10) {
  const url = `https://api.unsplash.com/search/photos?query=snow&page=${page}&per_page=${perPage}&client_id=${PUBLIC_UNSPLASH}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map((photo: any) => photo.urls.regular); // Array of photo objects
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return [];
  }
}


