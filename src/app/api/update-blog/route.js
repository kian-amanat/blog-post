import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return new Response(
        JSON.stringify({ error: "Title and content are required" }),
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "blog.json");
    fs.writeFileSync(
      filePath,
      JSON.stringify({ title, content }, null, 2),
      "utf8"
    );

    return new Response(
      JSON.stringify({ message: "Blog updated successfully" }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
