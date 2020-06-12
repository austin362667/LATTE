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
  var div0 = document.createElement("div");
  div0.className = "product-item";
  var tmp = document.createElement("div")
  tmp.className = "item-img-wrapper"
  var div1 = document.createElement("img");
  div1.className = "item-img";
  var div2 = document.createElement("h1");
  div2.className = "item-name";
  var div3 = document.createElement("P");
  div3.className = "item-price";
  // var div4 = document.createElement("P");
  // div4.className = "detail";
  // var div5 = document.createElement("button");
  // div5.className = "button";

  const titleText = `${da_i.product}`;
  const catalogText = `${da_i.owner} -> ${da_i.groups}`;
  const detailText = `${da_i.detail}`;
  const priceText = `NTD$${da_i.price}`;

  if (
    da_i.product === "" || da_i.owner === "" || da_i.groups === "" ||
    da_i.price === ""
  ) {
  } else {
    div1.src = `./file/img/${da_i.photo}`;
    tmp.appendChild(div1)

    div2.innerHTML = titleText;
    div2.appendChild(document.createElement("br"));
    div2.innerHTML = titleText;
    div3.innerHTML = priceText;
    // div4.innerHTML = detailText;
    // div5.innerHTML = "Contact";

    div0.appendChild(tmp);
    div0.appendChild(div2);
    div0.appendChild(div3);
    // div0.appendChild(div4);
    // div0.appendChild(div5);

    document.getElementById("postList").appendChild(div0);
  }
};
