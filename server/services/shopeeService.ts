import { ShopeeRepository } from "../repositories/ShopeeRepository.ts";
import { Post} from "../../model/postModel.ts";
import { Keyword } from "../../model/keywordModel.ts";
import { Feed } from "../../model/feedModel.ts";
// import { cheerio } from "../../lib.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
const Shopee = new ShopeeRepository();

class ShopeeService {

    getKeywordData = async (word: string) => {
        const r = await Shopee.getKeywordData(word);
        const keywords = new Array<Keyword>();
    
        r.rows.map((keyword: any) => {
          var temp: any = {};
          r.rowDescription.columns.map((item: any, index: any) => {
            temp[item.name] = keyword[index];
          });
          keywords.push(temp);
        });
        return keywords;
      };

    getPostByItemIdAndShopId = async (itemId:number,shopId:number) => {
      const r = await Shopee.getPostByItemIdAndShopId(itemId, shopId);
      const posts = new Array<Post>();
  
      r.rows.map((keyword: any) => {
        var temp: any = {};
        r.rowDescription.columns.map((item: any, index: any) => {
          temp[item.name] = keyword[index];
        });
        posts.push(temp);
      });
      return posts;
    };

    inKeywordTable = async (keyword:Keyword[]) => {

        return keyword.length===1;

    }

    checkNeedUpdate = async (lastSearchTime:number) => {
        //360w Millisecond = 1h
        const currentTime:number = new Date().getTime();
        console.log('delta: ',currentTime - lastSearchTime)
        if(currentTime - lastSearchTime>36000000){
            return true;
        }else{
            return false;
        }
            
    }

  fetchShopeeData = async (keyword:string) => {
    var posts = new Array<Post>();    
      const r = await window.fetch(`https://shopee.tw/search?keyword=${keyword}`,{
          method: "GET",
          headers: new Headers({ "User-Agent": "Googlebot" }),
        })
        // console.log(await r.text())
        console.log(r.ok)

        // @ts-ignore
        // const parser = new DOMParser();
        const data:string = r.ok?await r.text():``
        // console.log(data);
        // const $ = cheerio.load(data);
        // var elements = $('div').find('.col-xs-2-4 shopee-search-item-result__item').find('a');
        // console.log(elements.length);
        let items:string[] = [];
        var reg = /href\s*=\s*"(.+?)"/gi;
        while (true) {
          var m = reg.exec(data.toString());
          if (!m) break;
          if(m[1].includes('-i.')){
            console.log(m[1]);
            items.push(m[1]);
          }
        }

        console.log(items.length);
        // console.log(items.length);
        // console.log($('div .col-xs-2-4 shopee-search-item-result__item a').length);
        // console.log($('div .col-xs-2-4 shopee-search-item-result__item a').attr("href").length);
        // @ts-ignore
        // const doc = parser.parseFromString(r.body, "text/html");
        // var items = new Array($('div').find('.col-xs-2-4 shopee-search-item-result__item').attr("href"));
        // console.log(items.length)
        for (var i=0;i<items.length;i++) {
          // console.log(items[i]);
          const link:string = items[i];
          console.log(link);
          const itemid:string = link.split('-i.')[1].split('.')[1];
          const shopid:string = link.split('-i.')[1].split('.')[0];
          if(itemid!=undefined && shopid!=undefined){

            console.log(`itemid: ${itemid}, shopid: ${shopid}`);

            const r = await window.fetch(
              `https://shopee.tw/api/v2/item/get?itemid=${itemid}&shopid=${shopid}`,
              {
                method: "GET",
                headers: new Headers({ "User-Agent": "Googlebot" }),
              });
            if(r.ok){
              const body = await r.json()
              var post:Post = await this.fromJson(body['item']);
              post = {...post, Detail:post.Detail.replace(' ', '').slice(0, 600), PostId:v4.generate()}
              console.log(`ok!  ...  itemid: ${post.ItemId}, shopid: ${post.ShopId}`);
              posts.push(post);
            }


          }

        }

    return posts;
  }

  getFeedPosts = async (keywordId:string) => {

    const r= await Shopee.getFeedPosts(keywordId);
    const posts = new Array<Post>();
    r.rows.map((post: any) => {
      var temp: any = {};
      r.rowDescription.columns.map((item: any, index: any) => {
        temp[item.name] = post[index];
      });
      posts.push(temp);
    });
    return posts;
  }

  createKeyword = async (keyword: Keyword) => {
    const r = await Shopee.createKeyword(keyword);
    return r;
  };

  updateKeyword = async (keyword: Keyword) => {
    const r = await Shopee.updateKeyword(keyword);
    return r;
  };

  createPost = async (post: Post) => {
    const r = await Shopee.createPost(post);
    return r;
  };

  createFeed = async (feed:Feed) => {
    const r = await Shopee.createFeed(feed);
    return r;
  };


  fromJson:any = async (json:any) => {
    return {      
      ItemId: json['itemid'],
      ShopId: json['shopid'],
      Title: json['name'],
      Price: json['price'],
      Image: json['image'],
      ViewCount: json['view_count'],
      SoldCount: json['historical_sold'],
      Detail: json['description'],
      Brand: json['brand'],
  }
  }

}

export { ShopeeService };