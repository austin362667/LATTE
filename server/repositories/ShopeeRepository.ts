import { Db } from "../../db.ts";
import { Post } from "../../model/postModel.ts";
import { Keyword } from "../../model/keywordModel.ts";
import { Feed } from "../../model/feedModel.ts";

class ShopeeRepository {

    async getKeywordData(word: string) {
        await Db.connect();
        const r = await Db.query(
          'SELECT * FROM Keyword_Table WHERE "Content"=$1;'
          ,word
        );
        await Db.end();
        return r;
    }

    async getPostByItemIdAndShopId(itemId:string,shopId:string) {
      await Db.connect();
      const r = await Db.query(
        'SELECT * FROM Post_Table WHERE "ItemId"=$1 AND "ShopId"=$2;'
        ,itemId
        ,shopId
      );
      await Db.end();
      return r;
  }

    async getFeedPosts(keywordId:string) {
        await Db.connect();
        const r = await Db.query(
          `SELECT * FROM Post_Table WHERE "PostId" IN (
            SELECT 
                "PostId"
            FROM
                Feed_Table
            WHERE
                "KeywordId" = '${keywordId}'
          ) ORDER BY "SoldCount" DESC, "ViewCount" DESC LIMIT 50;`
        );
        await Db.end();
        return r;
    }
    
    async createKeyword(keyword:Keyword){
        try {
            await Db.connect();
            const r = await Db.query(
              'INSERT INTO Keyword_Table ("KeywordId", "Content", "SearchCount", "LastSearchTime") VALUES ($1, $2, $3, $4);',
              keyword.KeywordId,
              keyword.Content,
              keyword.SearchCount,
              keyword.LastSearchTime
            );
          } catch (err) {
            console.log(err);
          } finally {
            await Db.end();
          }
    }

    async updateKeyword(keyword:Keyword){
        try {
            await Db.connect();
            const r = await Db.query(
              'UPDATE Keyword_Table SET "SearchCount" = $1, "LastSearchTime" = $2 WHERE "KeywordId" = $3;',
              keyword.SearchCount,
              keyword.LastSearchTime,
              keyword.KeywordId,
            );
          } catch (err) {
            console.log(err);
          } finally {
            await Db.end();
          }
    }

    async createPost(post:Post){
        try {
            await Db.connect();
            const r = await Db.query(
              'INSERT INTO Post_Table ("PostId", "Title", "Detail", "Brand", "Price", "SoldCount", "ViewCount", "ItemId", "ShopId", "Image") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
              post.PostId,
              post.Title,
              post.Detail,
              post.Brand,
              post.Price,
              post.SoldCount,
              post.ViewCount,
              post.ItemId,
              post.ShopId,
              post.Image
            );
          } catch (err) {
            console.log(err);
          } finally {
            await Db.end();
          }
    }

    async createFeed(feed:Feed){
      try {
          await Db.connect();
          const r = await Db.query(
            `INSERT INTO Feed_Table ("KeywordId", "PostId") VALUES ($1, $2);`,
            feed.KeywordId,
            feed.PostId,
          );
        } catch (err) {
          console.log(err);
        } finally {
          await Db.end();
        }
  }

}

export {ShopeeRepository}