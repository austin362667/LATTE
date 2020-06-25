const tool = {};

// tool.fetch = async function(path, obj){

// }

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

tool.listShow = function (da) {
  for (let i = 0; i < da.length; i++) {
    tool.postShow(da[i]);
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
  groups.className = "tag tag-teal";
  if(da_i.groups[0]==='b'){
    groups.className = "tag tag-pink";
  }
  if(da_i.groups[0]==='p'){
    groups.className = "tag tag-purple";
  }

  
  var title = document.createElement("h4");
  var detail = document.createElement("p");
  var user = document.createElement("div");
  user.className = "user";
  var user_img = document.createElement("img");
  user_img.src = "./user.png"
  var user_info = document.createElement("div")
  user_info.className = "user-info"

  const titleText = `${da_i.product}`;
  const catalogText = `${da_i.groups}`;
  const detailText = `${da_i.detail}`;
  const ownerText = `${da_i.owner}`
  const priceText = `NTD$${da_i.price}`;

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
    user_info.innerHTML =ownerText;

    card_body.appendChild(groups)
    card_body.appendChild(title)
    card_body.appendChild(detail)
    card_body.appendChild(user)

    user.appendChild(user_img)
    user.appendChild(user_info)

    card.appendChild(card_header)
    card.appendChild(card_body)

    document.getElementById("postList").appendChild(card);
  }
};
