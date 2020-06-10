const login = {};

login.html = `
  <div  id="login">
    <h1>Login</h1>
    <p>
      <label>Email</label><br/>
      <input id="email" type="email" value="">
    </p>
    <p>
      <label>Password</label><br/>
      <input id="password" type="password">
    </p>
    <button onclick="login.submit()">LogIn</button>
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
