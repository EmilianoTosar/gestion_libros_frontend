import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [
		1,
		'...',
		currentPage - 1,
		currentPage,
		currentPage + 1,
		'...',
		totalPages,
	];
};

export const genres = [
	'Misterio',
	'Ciencia Ficción',
	'Romance',
	'Drama',
	'Aventura',
	'Acción',
	'Terror',
	'Histórico',
	'Biografía',
	'Filosofía',
	'Política',
	'Negocios',
	'Autoayuda',
];

//no estan funcionando los mjes custom q escribi.
export const CreateLibroSchema = z.object({
	id: z.number().optional(),
	isbn: z
		.string()
		.min(1)
		.refine(
			async (input: string): Promise<boolean> => {
				try {
					const response = await fetch(
						`http://localhost:8000/api/libros/check-isbn/?isbn=${input}`
					);
					if (!response.ok) {
						throw new Error('Error checking ISBN availability');
					}

					const existingBook = await response.json();

					return !existingBook.isISBNUsed;
				} catch (error) {
					console.error('Error checking ISBN availability:', error);
					return false;
				}
			},
			{ message: 'Ya existe un libro con el mismo ISBN' }
		),
	title: z.string().min(1, { message: 'Por favor ingresa un titulo' }),
	author: z.string().min(1, { message: 'Por favor ingresa un autor' }),
	description: z
		.string()
		.min(1, { message: 'Por favor ingresa una descripcion' }),
	thumbnail: z
		.string()
		.min(1, { message: 'Por favor ingresa la url de la imagen' }),
	publicationDate: z.coerce.date({
		invalid_type_error: 'Por favor ingresa una fecha correcta',
	}),
	price: z.coerce
		.number()
		.gt(0.1, { message: 'Por favor ingresa un número mayor a 0' }),
	genre: z
		.string()
		.min(1, { message: 'Por favor, elige un género de la lista' }),
});

export const EditLibroSchema = z.object({
	id: z.number().optional(),
	isbn: z
		.string()
		.min(1)
		.refine(
			async (input: string): Promise<boolean> => {
				try {
					const response = await fetch(
						`http://localhost:8000/api/libros/check-isbn/?isbn=${input}`
					);

					if (!response.ok) {
						throw new Error('Error checking ISBN availability');
					}

					const existingBook = await response.json();

					return !existingBook.isISBNUsed;
				} catch (error) {
					console.error('Error checking ISBN availability:', error);
					return false;
				}
			},
			{ message: 'Ya existe un libro con el mismo ISBN' }
		)
		.optional(),
	title: z
		.string()
		.min(1, { message: 'Por favor ingresa un titulo' })
		.optional(),
	author: z
		.string()
		.min(1, { message: 'Por favor ingresa un autor' })
		.optional(),
	description: z
		.string()
		.min(1, { message: 'Por favor ingresa una descripcion' }),
	thumbnail: z
		.string()
		.min(1, { message: 'Por favor ingresa la url de la imagen' }),
	publicationDate: z.coerce
		.date({
			invalid_type_error: 'Por favor ingresa una fecha correcta',
		})
		.optional(),
	price: z.coerce
		.number()
		.gt(0.1, { message: 'Por favor ingresa un número mayor a 0' })
		.optional(),
	genre: z
		.string()
		.min(1, { message: 'Por favor, elige un género de la lista' })
		.optional(),
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
