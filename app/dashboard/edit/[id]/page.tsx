import ClientEditForm from "./ClientEditForm";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;

  return <ClientEditForm postId={postId} />;
}
