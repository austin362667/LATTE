
  export async function chatView(context:any){
      const ruserName = context.request.url.searchParams.get('receiver')
         console.log(ruserName)
        context.cookies.set("ruserName", ruserName)
        context.response.headers.set("content-type", "text/html");
        context.response.body = await Deno.open("./public/chat.html");
        // await send(context, "./public/chat.html") 
  }