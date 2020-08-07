// @ts-ignore
export const fetchShopeeData = async (keyword) => {
    const r = await window.fetch(`https://shopee.tw/search?keyword=${keyword}`,{
        method: "GET",
        headers: new Headers({ "User-Agent": "Googlebot" }),
      })
      // @ts-ignore
      const parser = new DOMParser();
      // @ts-ignore
      const doc = parser.parseFromString(r.body, "text/html");
      console.log(doc);
}