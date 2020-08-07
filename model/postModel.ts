interface Post {
  PostId: string;
  Title: string;
  Detail: string;
  Brand: string;
  Price: number;
  SoldCount:  number;
  ViewCount:  number;
  ItemId: number
  ShopId: number;
  Image: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export { Post };
