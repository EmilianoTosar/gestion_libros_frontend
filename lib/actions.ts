'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CreateLibroSchema, EditLibroSchema } from './utils';
import { getBookById } from './api';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function createBook(state: any, formData: FormData) {
	const title = formData.get('title');
	const author = formData.get('author');
	const price = formData.get('price');
	const publicationDate = formData.get('publicationDate');
	const genre = formData.get('genre');
	const isbn = formData.get('isbn');
	const description = formData.get('description');
	const thumbnail = formData.get('thumbnail');

	const validFields = await CreateLibroSchema.safeParseAsync({
		title,
		author,
		price,
		publicationDate,
		isbn,
		genre,
		description,
		thumbnail,
	});

	console.log('validFields parseados', validFields);

	if (!validFields.success) {
		return { error: validFields.error.format() };
	}

	try {
		const res = await fetch(`http://localhost:8000/api/libros`, {
			method: 'POST',
			body: JSON.stringify(validFields.data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (err) {
		console.error(err);
	} finally {
		revalidatePath(`/`);
		redirect('/');
	}
}

export async function updateBook(
	id: number,
	prevState: any,
	formData: FormData
) {
	const libro = await getBookById(id);

	const title = formData.get('title');
	const author = formData.get('author');
	const price = formData.get('price');
	const publicationDate = formData.get('publicationDate');
	const genre = formData.get('genre');
	let isbn = formData.get('isbn');
	const description = formData.get('description');
	const thumbnail = formData.get('thumbnail');

	let editedFields;

	if (libro.isbn === isbn) {
		editedFields = await EditLibroSchema.safeParseAsync({
			title,
			author,
			price,
			publicationDate,
			genre,
			thumbnail,
			description,
		});
	} else {
		editedFields = await EditLibroSchema.safeParseAsync({
			title,
			author,
			price,
			publicationDate,
			isbn,
			genre,
			thumbnail,
			description,
		});
	}

	if (!editedFields.success) {
		return { error: editedFields.error.format() };
	}

	try {
		const res = await fetch(`http://localhost:8000/api/libros/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(editedFields.data),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (err) {
		console.error(err);
	} finally {
		revalidatePath(`/`);
		revalidatePath(`/${id}`);
		redirect(`/${id}`);
	}
}

export async function deleteBook(id: number) {
	//si borro todos los libros de la ultima pagina me da error y se cae la app porque la ultima pagina ya no existe
	try {
		console.log('borar: ', `http://localhost:8000/api/libros/${id}`);
		const response = await fetch(`http://localhost:8000/api/libros/${id}`, {
			method: 'DELETE',
			cache: 'no-store'
		});
		
		if (response.ok) {
			const responseData = await response.json();
			console.log('Datos de la respuesta:', responseData);
			
			console.log(`Libro con ID ${id} borrado exitosamente`);
		} else {
			console.error(
				`Error al borrar el libro con ID ${id}. Estado de la respuesta: ${response.status}`
				);
			}
			revalidatePath('/');
			redirect('/');
	} catch (err) {
		return { message: 'Error borrando libro!' };
	}
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


/* export async function useStateAction(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const title = formData.get('title');
	const author = formData.get('author');

	const validFields = await EditLibroSchema.safeParseAsync({
		title,
		author,
	});

	console.log('validatedFields', validFields.success);

	if (!validFields.success) {
		return {
			message: 'failure',
			errors: validFields.success
				? {}
				: {
						title: validFields.error.errors.find(
							error => error.path[0] === 'title'
						)?.message,
						author: validFields.error.errors.find(
							error => error.path[0] === 'author'
						)?.message,
				  },
		};
	}
	const res = await fetch(`http://localhost:8000/api/libros`, {
		method: 'POST',
		body: JSON.stringify(validFields),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return {
		message: 'success',
		errors: {},
	};
}
 */
