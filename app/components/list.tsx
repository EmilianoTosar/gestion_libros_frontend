import Link from 'next/link';
import { InitialData, Libro } from '../../lib/definitions';
import Image from 'next/image';
import { capitalize } from '@/lib/utils';
import { getFilteredBooks } from '@/lib/api';

export default async function List({
	query,
	page,
}: {
	query: string;
	page: number;
}) {
	const data: InitialData = await getFilteredBooks(query, page);

	return (
		<div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 px-8'>
			{data.libros ? (
				data.libros.map((libro: Libro) => {
					const genre = capitalize(libro.genre);

					return (
						<div
							className='bg-white rounded-lg overflow-hidden shadow-lg ring-4 ring-gray-500 ring-opacity-40 max-w-sm'
							key={libro.id}
						>
							<div className='relative'>
								<Image
									className=''
									src={libro.thumbnail}
									alt='Product Image'
									width={200}
									height={300}
								/>
								<div className='absolute opacity-80 top-0 right-0 bg-gray-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium'>
									{genre}
								</div>
							</div>
							<div className='p-4'>
								<h3 className='text-lg font-medium mb-2'>{libro.title}</h3>
								<p className='text-gray-600 text-sm mb-4'>{libro.author}</p>
								<div className='flex items-center justify-between'>
									<span className='font-bold text-lg'>${libro.price}</span>
									<Link href={`/${libro.id}`}>
										<button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>
											Ver Más
										</button>
									</Link>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<span>No hay libros con ese titulo</span>
			)}
		</div>
	);
}
