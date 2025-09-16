import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const body = await req.json();
  const { title, content, secret } = body;

  if (!title || !content) {
    return new Response(
      JSON.stringify({ error: "Title and content are required" }),
      {
        status: 400,
      }
    );
  }

  if (secret && secret !== process.env.MY_REVALIDATE_TOKEN) {
    return new Response(JSON.stringify({ error: "Invalid secret" }), {
      status: 401,
    });
  }

  const filePath = path.join(process.cwd(), "blog.json");
  fs.writeFileSync(
    filePath,
    JSON.stringify({ title, content }, null, 2),
    "utf8"
  );

  try {
    revalidatePath("/blog"); // revalidate the page
  } catch (err) {
    console.log("Revalidate failed:", err.message);
  }

  return new Response(
    JSON.stringify({ message: "Blog updated successfully" }),
    {
      status: 200,
    }
  );
}
