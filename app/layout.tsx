import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';

export const metadata: Metadata = {
	title: 'Gestor de libros',
	description: 'Gestor online de libros',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4'>
				<header className='text-xl font-bold leading-[3rem]'>
					<Link href='/'>
						<h1>Gestion de libros</h1>
					</Link>
					<div className='hidden h-auto w-full grow rounded-md bg-gray-50 md:block'></div>
					<form
						action={async () => {
							'use server';
							await signOut();
						}}
					>
						<button className='flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
							<PowerIcon className='w-6' />
							<div className='hidden md:block'>Sign Out</div>
						</button>
					</form>
				</header>
				<main className='py-8'>{children}</main>
				<Toaster />
				<footer className='text-center leading-[3rem] opacity-70'>
					© {new Date().getFullYear()} Gestion Libros
				</footer>
			</body>
		</html>
	);
}
