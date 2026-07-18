export const config = {
	runtime: 'edge'
};

export const POST = async ({ request }) => {
	try {
		const metrics = await request.json();

		console.log('Received RUM metrics:', metrics);

		return new Response('Metrics received', { status: 200 });
	} catch {
		return new Response('Bad request', { status: 400 });
	}
};
