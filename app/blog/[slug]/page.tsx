export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main className="container" style={{ padding: "96px 0" }}><h1>Blog post: {slug} — placeholder</h1></main>;
}
