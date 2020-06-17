const post = {};

post.html = `
<div id = "post">
<h1 class="panel">Post</h1>
<form method="post" enctype="multipart/form-data" id="postForm">

  <p>Title:<br><input type="text" name="product" id="product" /></p>
  <p>Detail:<br><input type="textarea" name="detail" id="detail" /></p>
  <p>Price:<br><input type="number" name="price" id="price" /></p>

  <p><label for="groups">Choose a group:</label>
  <select name="groups" id="groups">
    <option value="louis vuitton">Louis Vuitton</option>
    <option value="balenciaga">Balenciaga</option>
    <option value="gucci">Gucci</option>
    <option value="prada">Prada</option>
  </select></p>

  <p><label for="file">Photo:</label>
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
  tool.one("#msg").innerHTML = res.ok ? "Post Success!" : "Post Failed..";
};
