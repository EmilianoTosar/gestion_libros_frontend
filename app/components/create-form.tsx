'use client';

import Link from 'next/link';
import { createBook } from '../../lib/actions';
import { useFormState } from 'react-dom';
import { genres } from '@/lib/utils';
import { CreateButton } from './create-button';


export default function Form() {
	const [state, formAction] = useFormState(createBook, null);

	return (
		<form action={formAction}>
			<div className='rounded-md bg-gray-50 p-4 md:p-6'>
				{/* Título */}
				<div className='mb-4'>
					<label
						htmlFor='title'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.title ? 'text-rose-500' : ''
						}`}
					>
						Título
					</label>
					<div className='relative'>
						<input
							type='text'
							id='title'
							name='title'
							placeholder='Título'
							className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.title ? 'border-2 border-rose-500' : ''
							}`}
							aria-describedby='title-error'
						/>
					</div>
					<div id='title-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.title && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.title._errors}
							</p>
						)}
					</div>
				</div>
				{/* Autor */}
				<div className='mb-4'>
					<label
						htmlFor='author'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.author ? 'text-rose-500' : ''
						}`}
					>
						Autor
					</label>
					<div className='relative'>
						<input
							type='text'
							id='author'
							name='author'
							placeholder='Autor'
							className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.author ? 'border-2 border-rose-500' : ''
							}`}
							aria-describedby='author-error'
						/>
					</div>
					<div id='author-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.author && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.author._errors}
							</p>
						)}
					</div>
				</div>
				{/* Isbn */}
				<div className='mb-4'>
					<label
						htmlFor='isbn'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.isbn ? 'text-rose-500' : ''
						}`}
					>
						ISBN
					</label>
					<div className='relative'>
						<input
							type='text'
							id='isbn'
							name='isbn'
							placeholder='ISBN'
							className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.isbn ? 'border-2 border-rose-500' : ''
							}`}
							aria-describedby='isbn-error'
						/>
					</div>
					<div id='isbn-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.isbn && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.isbn._errors}
							</p>
						)}
					</div>
				</div>
				{/*Thumbnail*/}
				<div className='mb-4'>
					<label
						htmlFor='thumbnail'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.thumbnail ? 'text-rose-500' : ''
						}`}
					>
						Imagen (url)
					</label>
					<div className='relative'>
						<input
							type='text'
							id='thumbnail'
							name='thumbnail'
							placeholder='Título'
							className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.thumbnail ? 'border-2 border-rose-500' : ''
							}`}
							aria-describedby='thumbnail-error'
						/>
					</div>
					<div id='thumbnail-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.thumbnail && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.thumbnail._errors}
							</p>
						)}
					</div>
				</div>
				{/* Descripcion */}
				<div className='mb-4'>
					<label
						htmlFor='description'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.description ? 'text-rose-500' : ''
						}`}
					>
						Descripcion
					</label>
					<div className='relative'>
						<input
							type='textarea'
							id='description'
							name='description'
							placeholder='Descripcion'
							className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.description ? 'border-2 border-rose-500' : ''
							}`}
							aria-describedby='description-error'
						/>
					</div>
					<div id='description-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.description && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.description._errors}
							</p>
						)}
					</div>
				</div>
				{/* Precio */}
				<div className='mb-4'>
					<label
						htmlFor='price'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.price ? 'text-rose-500' : ''
						}`}
					>
						Precio
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='price'
								name='price'
								type='number'
								step='0.10'
								placeholder='Precio'
								className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
									state?.error?.price ? 'border-2 border-rose-500' : ''
								}`}
								aria-describedby='price-error'
							/>
						</div>
					</div>
					<div id='price-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.price && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.price._errors}
							</p>
						)}
					</div>
				</div>
				{/* Fecha de publicacion */}
				<div className='mb-4'>
					<label
						htmlFor='publicationDate'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.publicationDate ? 'text-rose-500' : ''
						}`}
					>
						Precio
					</label>
					<div className='relative mt-2 rounded-md'>
						<div className='relative'>
							<input
								id='publicationDate'
								name='publicationDate'
								type='date'
								placeholder='Fecha de publicacion'
								className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
									state?.error?.publicationDate
										? 'border-2 border-rose-500'
										: ''
								}`}
								aria-describedby='date-error'
							/>
						</div>
					</div>
					<div id='date-error' aria-live='polite' aria-atomic='true'>
						{state?.error?.publicationDate && (
							<p className='mt-2 text-sm text-rose-500'>
								{state?.error?.publicationDate._errors}
							</p>
						)}
					</div>
				</div>
				{/* Genre */}
				<div className='mb-4'>
					<label
						htmlFor='genre'
						className={`mb-2 block text-sm font-medium ${
							state?.error?.genre ? 'text-rose-500' : ''
						}`}
					>
						Genero
					</label>
					<div className='relative'>
						<select
							id='genre'
							name='genre'
							className={`peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${
								state?.error?.genre ? 'border-2 border-rose-500' : ''
							}`}
							defaultValue=''
							aria-describedby='genre-error'
						>
							<option value='' disabled>
								Elegir genero
							</option>
							{genres.map((genre, id) => (
								<option key={id} value={genre}>
									{genre}
								</option>
							))}
						</select>
					</div>
				</div>
				<div id='genre-error' aria-live='polite' aria-atomic='true'>
					{state?.error?.genre && (
						<p className='mt-2 text-sm text-rose-500'>{state?.error?.genre._errors}</p>
					)}
				</div>
			</div>
			<div className='mt-6 flex justify-end gap-4'>
				<Link
					href='/'
					className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'
				>
					Cancelar
				</Link>
				<CreateButton />
			</div>
		</form>
	);
}
