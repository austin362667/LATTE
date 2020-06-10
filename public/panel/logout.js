const logout = {};

logout.start = async function () {
  const r = await tool.postJson("/api/v1.0/user/logout");

  r.ok
    ? tool.show("<p>Logout success!</p>")
    : tool.show("<p>Logout failed..</p>");
};
