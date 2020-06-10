const signup = {};

signup.html = `
<div id = "signup">
<h1>Signup</h1>
<p>
    <label>Name</label><br/>
    <input id="name" type="text" value="">
</p>
<p>
    <label>Password</label><br/>
    <input id="password" type="password">
</p>
<p>
    <label>Email</label><br/>
    <input id="email" type="email" value="">
</p>
    <button onclick="signup.submit()">SignUp</button>
<p class="msg" id="msg">&nbsp;</p>
</div>
`;

signup.start = function () {
  tool.show(signup.html);
};

signup.submit = async function () {
  const name = document.querySelector("#name").value;
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value;
  const user = { name: name, email: email, password: password };
  const r = await tool.postJson("/api/v1.0/user/signup", user);
  tool.one("#msg").innerHTML = r.ok ? "Signup success!" : "Signup failed..";
  return false;
};
