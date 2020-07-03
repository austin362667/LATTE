const profile = {};

profile.start = async function () {
  var userDb = {};
  var data = {};
  const r = await tool.postJson("/api/v1.0/user/profile");
  r.ok ? { data } = await r.json() : {};
  userDb = r.ok ? data : {};
  r.ok
    ? tool.show(`<h3 class="info">Name: ${userDb.name}<br>Email: ${userDb.email}</h3>`)
    : tool.show(`<p>You must login to view your profile!</p>`);
};
