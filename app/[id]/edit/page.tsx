import { getBookById } from '@/lib/api';
import Form from '../../components/edit-form';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: number } }) {
	const id = params.id;
	const libro = await getBookById(id);

	if (!libro) notFound();

	return (
		<main>
			<Form libro={libro} />
		</main>
	);
}
