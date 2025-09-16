import fs from "fs";
import path from "path";

export default async function Page() {
  // مسیر فایل JSON
  const filePath = path.join(process.cwd(), "blog.json");
  const blogData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return (
    <main
      style={{
        direction: "rtl",
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "sans-serif",
        textAlign: "right",
        lineHeight: "1.8",
      }}
    >
      <h1>{blogData.title}</h1>
      <p>{blogData.content}</p>
    </main>
  );
}
