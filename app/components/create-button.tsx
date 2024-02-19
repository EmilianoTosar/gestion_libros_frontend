import { useFormStatus } from 'react-dom';
import { Button } from './button';

export function CreateButton() {
	const { pending } = useFormStatus();
	
	return (
		<Button type='submit' disabled={pending}>
			{pending ? '...' : 'Agregar Libro'}
		</Button>
	);
}
