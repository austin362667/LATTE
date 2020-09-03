const tool = {};

tool.postJson = async function (path, obj) {
  console.log(`tool.postJson.path = ${path}`);
  console.log(`tool.postJson.obj = ${JSON.stringify(obj)}`);
  const r = await fetch(path, {
    body: JSON.stringify(obj),
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  console.log(`tool.postJson.r = ${JSON.stringify(r)}`);
  return r;
};

tool.id = function (id) {
  return document.getElementById(id);
};

tool.one = function (path) {
  return document.querySelector(path);
};

tool.all = function (path) {
  return document.querySelectorAll(path);
};

tool.id = function (path, f) {
  tool.all(path).forEach(f);
};

tool.html = function (path, html) {
  tool.each(path, (node) => {
    node.innerHTML = html;
  });
};

tool.show = function (html) {
  tool.one("main").innerHTML = html;
};

tool.title = function (title) {
  tool.one("title").innerHTML = title;
};

tool.shopeeListShow = function (da, avgPrice) {
  for (let i = 0; i < da.length; i++) {
    tool.shopeeShow(da[i], avgPrice);
  }
};

tool.postListShow = function (da, avgPrice) {
  for (let i = 0; i < da.length; i++) {
    tool.postShow(da[i], avgPrice);
  }
};

tool.postShow = async function (da_i) {
  var card = document.createElement("div");
  card.className = "card";
  var card_header = document.createElement("div")
  card_header.className = "card-header"
  var item_img = document.createElement("img");
  var card_body = document.createElement("div");
  card_body.className = "card-body";
  var groups = document.createElement("span");
  groups.className = "tag tag-purple";
  if(da_i.groups[0]==='美' || da_i.groups[0]==='穿'){
    groups.className = "tag tag-pink";
  }
  if(da_i.groups[0]==='科' || da_i.groups[0]==='娛'){ 
    groups.className = "tag tag-teal";
  }

  
  var title = document.createElement("h4");
  var detail = document.createElement("p");
  var price = document.createElement("h3");
  var user = document.createElement("div");
  user.className = "user";
  var user_img = document.createElement("img");
  user_img.src = "./user.png"
  var user_info = document.createElement("div")
  user_info.className = "user-info"
  var user_name = document.createElement("a");
  var date = document.createElement("small")

  const titleText = `${da_i.product}`;
  const catalogText = `${da_i.groups}`;
  const detailText = `${da_i.detail}`;
  const ownerText = `${da_i.owner}`
  const priceText = `${da_i.price}`;
  const dateStr = da_i.updated_at.replace(/[A-Za-z]+/g, " ").split('.')[0]
  const dateText = `${dateStr}`;

  if (
    da_i.product === "" || da_i.owner === "" || da_i.groups === "" ||
    da_i.price === ""
  ) {
  } else {
    item_img.src = `./file/img/${da_i.photo}`;
    card_header.appendChild(item_img)

    groups.innerHTML = catalogText;
    title.innerHTML = titleText;
    detail.innerHTML = detailText;
    price.innerHTML = priceText;
    
    user_name.innerHTML = ownerText;
    user_name.href = `${priceText}`;///chat?receiver=${ownerText}
    date.innerHTML = dateText;

    card_body.appendChild(groups)
    card_body.appendChild(title)
    card_body.appendChild(detail)
    // card_body.appendChild(price)
    price.style = "text-decoration:none";
    price.target="_blank";
    card_body.appendChild(user)

    user.appendChild(user_img)
    user.appendChild(user_info)
    user_info.appendChild(user_name)
    user_info.appendChild(date)

    card.appendChild(card_header)
    card.appendChild(card_body)

    document.getElementById("postList").appendChild(card);
  }
};


tool.shopeeShow = async function (da_i, avgPrice) {
  var card = document.createElement("div");
  card.className = "card";
  var card_header = document.createElement("div")
  card_header.className = "card-header"
  var item_img = document.createElement("img");
  var card_body = document.createElement("div");
  card_body.className = "card-body";
  var sold = document.createElement("span");
  sold.className = "tag tag-pink";
  var view = document.createElement("span");
  view.className = "tag tag-teal";

  var priceCheck = document.createElement("span");

  if(da_i.Price/100000 > avgPrice*1.3){
    priceCheck.className = "tag tag-green";
    priceCheck.innerHTML = "太貴啦~";
  }
  if(da_i.Price/100000 < avgPrice*0.8){ 
    priceCheck.className = "tag tag-purple";
    priceCheck.innerHTML = "太便宜!";
  }

  
  var title = document.createElement("h4");
  var detail = document.createElement("p");
  var hoverDetail = document.createElement("p");
  detail.className = 'detail';
  hoverDetail.className = 'hoverDetail';
  var price = document.createElement("h3");
  var user = document.createElement("div");
  user.className = "user";
  var user_img = document.createElement("img");
  user_img.src = "./user.png"
  var user_info = document.createElement("div")
  user_info.className = "user-info"
  var user_name = document.createElement("a");
  var date = document.createElement("small")

  const titleText = `${da_i.Title}`;
  const soldText = `已賣出 ${da_i.SoldCount}`;
  const viewText = `人氣 ${da_i.ViewCount}`;
  const detailText = `${da_i.Detail}`;
  const hoverDetailText = `${da_i.Detail}`;
  const ownerText = `https://shopee.tw/${da_i.Title}-i.${da_i.ShopId}.${da_i.ItemId}`
  const priceText = `NTD$${da_i.Price/100000.0}`;
  // const dateStr = `人氣 ${da_i.ViewCount}`//da_i.updated_at.replace(/[A-Za-z]+/g, " ").split('.')[0]
  const dateText = `2020/09`;

  if (
    da_i.Title === "" ||
    da_i.Price === ""
  ) {
  } else {
    item_img.src = `https://cf.shopee.tw/file/${da_i.Image}`;
    card_header.appendChild(item_img)

    sold.innerHTML = soldText;
    view.innerHTML = viewText;
    title.innerHTML = titleText;
    detail.innerHTML = detailText;
    hoverDetail.innerHTML = hoverDetailText;
    price.innerHTML = priceText;
    user_name.innerHTML ='蝦皮傳送門';
    user_name.style = "text-decoration:none";
    user_name.href = `${ownerText}`;
    user_name.target="_blank";
    date.innerHTML = dateText;

    card_body.appendChild(sold)
    card_body.appendChild(view)
    card_body.appendChild(priceCheck)
    card_body.appendChild(title)
    card_body.appendChild(detail)
    // card_body.appendChild(hoverDetail)
    card_body.appendChild(price)
    card_body.appendChild(user)

    user.appendChild(user_img)
    user.appendChild(user_info)
    user_info.appendChild(user_name)
    user_info.appendChild(date)

    card.appendChild(card_header)
    card.appendChild(card_body)

    document.getElementById("postList").appendChild(card);
  }
};

tool.avgPrice = function (data) {

  var avgPrice = 0;
  for(var i of data){
    avgPrice+=(i.Price/100000);
  }
  avgPrice/=data.length;

  return avgPrice;
}
