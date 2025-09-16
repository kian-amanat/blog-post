export async function GET(req) {
  try {
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");
    const path = url.searchParams.get("path") || "/";

    if (secret !== process.env.MY_REVALIDATE_TOKEN) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
      });
    }

    // Revalidate the requested path
    await res.revalidate(path); // App Router: triggers ISR for that path
    return new Response(JSON.stringify({ revalidated: true, path }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
