const post = {};

post.html = `
<div id = "post">
<h1>Post</h1>
  <p>Title:<br><input type="text" name="product" id="product" /></p>
  <p>Detail:<br><input type="textarea" name="detail" id="detail" /></p>
  <p>Price:<br><input type="number" name="price" id="price" /></p>
<form method="post" enctype="multipart/form-data" id="postForm">
  <div>
    <label for="file">Photo:</label><br>
    <input type="file" id="photo" name="photo" multiple>
  </div>
</form>
<br>
<button onclick="post.submit()">Post</button>
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
  var files = tool.one("#postForm input[type=file]").files;
  var form = new FormData();
  for (var i = 0; i < files.length; i++) {
    form.append(`photo`, files[i]); // ${name}_${i} => photo
  }
  var res = await fetch("/api/v1.0/post/upload", {
    method: "POST",
    body: form,
  }).then((response) => response.json());

  var post = {
    "product": product,
    "detail": detail,
    "price": price,
    "photo": res.data,
  };
  const r = await tool.postJson("/api/v1.0/post/post", post);
  tool.one("#msg").innerHTML = r.ok ? "Post Success!" : "Post Failed..";
};
