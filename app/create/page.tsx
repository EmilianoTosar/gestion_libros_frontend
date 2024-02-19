import Form from '../components/create-form';

export default async function Page() {
	return (
		<main className='flex items-center justify-center'>
			<div className='w-1/2'>
				<Form />
			</div>
		</main>
	);
}
