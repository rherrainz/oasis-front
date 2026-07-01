import PostForm from "./PostForm";

function CreatePostPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
        Crear post
      </h1>
      <PostForm mode="create" />
    </section>
  );
}

export default CreatePostPage;
