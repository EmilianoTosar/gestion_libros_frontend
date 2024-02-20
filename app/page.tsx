import { getFilteredCount } from '@/lib/api';
import Pagination from './components/pagination';
import Search from './components/search';
import List from './components/list';
import Link from 'next/link';
import { Suspense } from 'react';
import ImageGrid from './components/list-skeleton';

export default async function Home({
	searchParams,
}: {
	searchParams?: { query?: string; page?: string }; 
}) {
	const page = Number(searchParams?.page) || 1;
	const query = searchParams?.query || '';

	const totalPages = await getFilteredCount(query);

	return (
		<section>
			<div className='mb-10 px-8 flex items-center justify-between gap-2'>
				<Search placeholder='Busqueda por titulo...' />
				<div>
					<Link
						href='/create'
						className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
					>
						Agregar Libro
					</Link>
				</div>
			</div>
			<div>
				<Suspense fallback={<ImageGrid />}>
					<List query={query} page={page} />
				</Suspense> 
			</div>
			<div className='mt-10 flex w-full justify-center'>
				<Pagination totalPages={totalPages} />
			</div> 
		</section>
	)
}
