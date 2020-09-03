const post = {};

post.html = `
<div id = "post">
<h1 class="panel">Post</h1>
<form method="post" enctype="multipart/form-data" id="postForm">

  <p><label for="product">就是標題:</label><input type="text" name="product" id="product" /></p>
  <p><label for="detail">寫些內容吧:</label><textarea name="detail" id="detail"></textarea></p>
  <p><label for="price">相關連結(非必填):</label><input type="text" name="price" id="price" /></p>

  <p><label for="groups">選擇一種分類:</label>
  <select name="groups" id="groups">
    <option value="其他">其他</option>
    <option value="美妝">美妝</option>
    <option value="穿搭">穿搭</option>
    <option value="科技">科技</option>
    <option value="日用">日用</option>
    <option value="戶外">戶外</option>
    <option value="書籍">書籍</option>
    <option value="娛樂">娛樂</option>
  </select></p>

  <p><label for="photo">Photo:</label>
  <input type="file" id="photo" name="photo" multiple></p>
</form>
<br>
<p><button onclick="post.submit()">Post</button></p>
<p class="msg" id="msg">&nbsp;</p>
</div>
`;

post.start = function () {
  tool.show(post.html);
};

post.submit = async function () {
  var product = tool.one("#product").value;
  var detail = tool.one("#detail").value;
  var price = tool.one("#price").value;
  var groups = tool.one("#groups").value;
  var files = tool.one("#postForm input[type=file]").files;
  var form = new FormData();
  for (var i = 0; i < files.length; i++) {
    form.append(`photo`, files[i]); // ${name}_${i} => photo
  }
  form.append("product", product)
  form.append("detail", detail)
  form.append("price", price)
  form.append("groups", groups)
  var res = await fetch("/api/v1.0/post/upload", {
    method: "POST",
    body: form,
  })
  console.log(res.json())
  // var post = {
  //   "product": product,
  //   "detail": detail,
  //   "price": price,
  //   "photo": res.data,
  // };
  // const r = await tool.postJson("/api/v1.0/post/post", post);
  tool.one("#msg").innerHTML = res.ok ? "Post Success!" : "Post Failed..PLease Login!";
};
