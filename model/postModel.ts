interface Post {
  PostId: string;
  Title: string;
  Detail: string;
  Brand: string;
  Price: number;
  SoldCount:  number;
  ViewCount:  number;
  ItemId: string
  ShopId: string;
  Image: string;
  // createdAt: Date;
  // updatedAt: Date;
}

interface oPost{
  owner: string,
  email:string,
  groups:string,
  product:string,
  detail:string,
  price:string,
  photo:string,
}

export { Post, oPost };
