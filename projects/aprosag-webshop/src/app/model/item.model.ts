export enum COVER_TYPE {
  HARD_COVER,
  SOFT_COVER
}

export class Item {
  id: string = "";
  title: string = "";
  subtitle: string = "";
  description: string = "";
  page_count: number = -0;
  cover_type: COVER_TYPE = COVER_TYPE.HARD_COVER;
  ISBN: string = "";
  weight: number = -1;
  publication_date: number = -1;
  storage_amount: number = -1;
  price: number = -1;
  discount_price: number = -1;
  discount_percentage: number = -1;
  image_urls: any[] = [];
}
