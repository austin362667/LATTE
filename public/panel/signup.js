const signup = {};

signup.html = `
<div id = "signup">
<h1 class="panel">Signup</h1>
<p>
    <label for="name">Name</label>
    <input id="name" type="text" value="">
</p>
<p>
    <label for="password">Password</label>
    <input id="password" type="password" value="">
</p>
<p>
    <label for="email">Email</label>
    <input id="email" type="email" value="">
</p>
<p><button onclick="signup.submit()">SignUp</button></p>
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

  let checkMsg = ""
  if(name === ""){
    checkMsg+="Just pick a Name you like!<br>"
  }
  if(password === ""){
    checkMsg+="Please fill the password for your safety.<br>"
  }
  if(!email.includes('@')){
    checkMsg+="Email is needed!<br>"
  }
  if(checkMsg===""){
  const r = await tool.postJson("/api/v1.0/user/signup", user);
  tool.one("#msg").innerHTML = r.ok ? "Signup success!" : "Signup failed..";
  }
  tool.one("#msg").innerHTML = checkMsg;
  checkMsg = ""
  return false;
};
