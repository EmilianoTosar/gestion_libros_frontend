import { ZodFormattedError } from "zod";

export type Libro = {
	id: number;
	isbn: string;
	title: string;
	author: string;
	price: number;
	publicationDate: string;
	genre: string;
	thumbnail: string;
	description: string;
}

export type ChangedData = {
	isbn?: string;
	title?: string;
	author?: string;
	price?: number;
	publicationDate?: string;
	genre?: string;
	description?: string;
	thumbnail?: string;
}

export type InitialData = {
	message: string;
	libros: Libro[];
	totalPages: number
}

export type FormState = {
	errors: {
		title?: string;
		author?: string;
		price?: string;
		publicationDate?: string;
		genre?: string;
		isbn?: string;
		id?: string | undefined;
		error?: string
	},
  message?: string | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
