import { redirect } from 'next/navigation';

export default function BlogSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/en/blog/${params.slug}`);
}
