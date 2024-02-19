export async function getAllBooks(page: number) {
	const res = await fetch(`http://localhost:8000/api/libros?page=${page}`, {
		cache: 'no-store',
	});
	if (res.ok) {
		return res.json();
	}
}

export async function getBookById(id: number) {
	const res = await fetch(`http://localhost:8000/api/libros/${id}`, {
		cache: 'no-store',
	});
	if (res.ok) {
		return res.json();
	}
}

export async function getFilteredBooks(query: string, page: number) {
	const res = await fetch(`http://localhost:8000/api/libros/?page=${page}&query=${query}`, {
		cache: 'no-store',
	});
	if (res.ok) {
		const data = await res.json()
		return data
	} else {
		throw new Error('Fallo la conexion con la base de datos')
	}
}

export async function getFilteredCount(query: string) {
	const res = await fetch(`http://localhost:8000/api/libros/count?query=${query}`, {
		cache: 'no-store',
	});
	if (res.ok) {
		const data = await res.json()
		return data.totalPages
	}
}

