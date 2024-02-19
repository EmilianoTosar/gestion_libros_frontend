import { useFormStatus } from 'react-dom';
import { Button } from './button';

export function EditButton() {
	const { pending } = useFormStatus();
	return (
		<Button type='submit' disabled={pending}>
			{pending ? 'Editando...' : 'Editar Libro'}
		</Button>
	);
}
