import { PUBLIC_UNSPLASH } from "../lib/config";


export async function fetchNaturePhotos(page: number = 1, perPage: number = 10) {
  const url = `https://api.unsplash.com/search/photos?query=nature&page=${page}&per_page=${perPage}&client_id=${PUBLIC_UNSPLASH}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();
    return data.results as UnsplashPhoto[]; // Array of photo objects
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return [];
  }
}


export interface UnsplashPhoto {
    id: string;
    slug: string;
    alternative_slugs: Record<string, string>;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string | null;
    alt_description: string;
    breadcrumbs: any[];
    urls: {
      raw: string;
      full: string;
      regular: string;
      small: string;
      thumb: string;
      small_s3: string;
    };
    links: {
      self: string;
      html: string;
      download: string;
      download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: any | null;
    topic_submissions: Record<string, { status: string; approved_on: string }>;
    asset_type: string;
    user: {
      id: string;
      updated_at: string;
      username: string;
      name: string;
      first_name: string;
      last_name: string;
      twitter_username: string | null;
      portfolio_url: string | null;
      bio: string | null;
      location: string | null;
      links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
      };
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
      instagram_username: string | null;
      total_collections: number;
      total_likes: number;
      total_photos: number;
      total_promoted_photos: number;
      total_illustrations: number;
      total_promoted_illustrations: number;
      accepted_tos: boolean;
      for_hire: boolean;
      social: {
        instagram_username: string | null;
        portfolio_url: string | null;
        twitter_username: string | null;
        paypal_email: string | null;
      };
    };
  }
  