import PostForm from "./PostForm";

function CreatePostPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-ink">Crear post</h1>
      <PostForm mode="create" />
    </section>
  );
}

export default CreatePostPage;
