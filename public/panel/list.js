const list = {};

list.html = `
<ul id="postList" class="photo-grid">
</ul>
`;

list.start = async function () {
  const r = await tool.postJson("/api/v1.0/post/list");

  r.ok ? posts = await r.json() : posts = {};
  // console.log(posts.data[0].name)

  r.ok ? tool.show(list.html) : tool.show(`<p> Error! </p>`);

  await tool.listShow(posts.data);
};
