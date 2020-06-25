const list = {};

list.html = `
<div class="list">
    <div class="container" id="postList">
    </div>
</div>
`;

list.start = async function () {
  const r = await tool.postJson("/api/v1.0/post/list");

  r.ok ? posts = await r.json() : posts = {};
  // console.log(posts.data[0].name)

  r.ok ? tool.show(list.html) : tool.show(`<p> Error! </p>`);

  await tool.listShow(posts.data);
};


list.title = async function () {

  var term = tool.one("#term").value;
  var form = new FormData();
  form.append("term", term)

  var res = await fetch("/api/v1.0/post/list/title", {
    method: "POST",
    body: form,
  })
  // console.log(res.json())

  res.ok ? posts = await res.json() : posts = {};
  // console.log(posts.data[0].name)

  res.ok ? tool.show(list.html) : tool.show(`<p> Error! </p>`);

  await tool.listShow(posts.data);
};