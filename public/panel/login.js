const login = {};

login.html = `
  <div  id="login" class="form">
    <h1  class="panel">Login</h1>
    <p>
      <label>Email</label>
      <input id="email" type="email" value="">
    </p>
    <p>
      <label>Password</label>
      <input id="password" type="password">
    </p>
    <div class="button"><button onclick="login.submit()">LogIn</button><div>
    <p class="msg" id="msg">&nbsp;</p>
  </div>
    `;
login.start = function () {
  tool.show(login.html);
};

login.submit = async function () {
  const email = tool.one("#email").value;
  const password = tool.one("#password").value;
  const user = { "email": email, "password": password };
  console.log(`login : ${user.email}`);
  const r = await tool.postJson("/api/v1.0/user/login", user);
  tool.one("#msg").innerHTML = r.ok ? "Login Success!" : "Login Failed..";
};
