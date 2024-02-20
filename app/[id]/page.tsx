import { getBookById } from '@/lib/api';
import Link from 'next/link';
import { Libro } from '../../lib/definitions';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { capitalize } from '@/lib/utils';
import { DeleteModal } from '../components/delete-modal';

type Props = {
	params: { id: number };
	searchParams: Record<string, string> | null | undefined;
};

export default async function BookPage({
	params: { id },
	searchParams,
}: Props) {
	const libro: Libro = await getBookById(id);
	const showModal = searchParams?.modal;

	if (!libro) {
		redirect('/');
	}

	const genre = capitalize(libro.genre);

	return (
		<div className='px-8'>
			<div className='mb-4 ml-4'>
				<Link className='hover:text-gray-600' href='/'>
					Volver a todos los libros &lt;-
				</Link>
			</div>
			<div className='bg-gray-100 dark:bg-gray-800 py-8 rounded-xl'>
				<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='flex flex-col md:flex-row -mx-4'>
						<div className='md:flex-1 px-4'>
							<div className='h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4'>
								<Image
									className='w-full h-full object-cover'
									src={libro.thumbnail}
									alt='Product Image'
									width={300}
									height={400}
								/>
							</div>
							<div className='flex -mx-2 mb-4'>
								<div className='w-1/2 px-2'>
									<Link href={`${libro.id}/edit`} className='hover:bg-gray-100'>
										<button className='flex flex-row justify-center w-full bg-blue-500 hover:bg-blue-600 dark:bg-gray-600 text-white py-2 px-4 rounded font-bold dark:hover:bg-gray-700'>
											Editar
											<PencilIcon className='w-4 ml-2' />
										</button>
									</Link>
								</div>

								<div className='w-1/2 px-2'>
									<Link
										className='flex flex-row justify-center w-full bg-rose-400 text-white py-2 px-4 rounded font-bold hover:bg-rose-500'
										href={`${libro.id}/?modal=true`}
									>
										Borrar
										<TrashIcon className='w-4 ml-2' />
									</Link>
									{showModal && (
										<DeleteModal id={libro.id} title={libro.title} />
									)}
								</div>
							</div>
						</div>
						<div className='md:flex-1 px-4'>
							<h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
								{libro.title}
							</h2>
							<div className='flex justify-between'>
								<span className='font-bold text-xl text-gray-700 dark:text-gray-300 flex-shrink-0'>
									{libro.author}
								</span>
								<span className='font-bold text-gray-700 dark:text-gray-300 flex-shrink-0'>
									{genre}
								</span>
							</div>
							<div className='flex my-4'>
								<div className='flex flex-col mr-4'>
									<span className='font-bold text-gray-700 dark:text-gray-300'>
										Fecha de Publicación
									</span>
									<span className='text-gray-600 dark:text-gray-300'>
										{' '}
										{libro.publicationDate}
									</span>
								</div>
								<div className='flex flex-col mr-4'>
									<span className='font-bold text-gray-700 dark:text-gray-300'>
										ISBN
									</span>
									<span className='text-gray-600 dark:text-gray-300'>
										{' '}
										{libro.isbn}
									</span>
								</div>
							</div>
							<div>
								<span className='font-bold text-gray-700 dark:text-gray-300'>
									Descripción
								</span>
								<p className='text-gray-600 dark:text-gray-300 text-sm mt-2'>
									{libro.description}
								</p>
							</div>
							<div className='pt-4 items-end'>
								<span className='text-gray-600 font-bold text-2xl'>
									$ {libro.price}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
