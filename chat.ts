
  export async function chatView(context:any){
        context.response.headers.set("content-type", "text/html");
        context.response.body = await Deno.open("./public/chat.html");
        // await send(context, "./public/chat.html") 
  }