import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import RewriteForm from "@/app/sections/blogs/rewriteForm";

export default async function RewritePage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Rewrite Post</h1>
      <RewriteForm post={post} />
    </div>
  );
}
