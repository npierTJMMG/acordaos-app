let options = {
	domain: '',
	production_url: 'http://10.16.111.152',
	production_path: '/bancosentencas-api/api',
	development_url: 'http://127.0.0.1',
	development_path: '/api',
	backend_port: ':8000',
	frontend_port: ':8080',
	host_images: '',
	app_version: '1.0.0',
	app_name: 'Justiças Militares - Banco de Acórdãos',
}
if (process.env.NODE_ENV === 'production') {
	options.domain = `${options.production_url}${options.production_path}`
	options.host_images = `${options.production_url}/banco-sentencas-api/`
} else {
	options.domain = `${options.development_url}${options.backend_port}${options.development_path}`
	options.host_images = `${options.development_url}${options.backend_port}/fotos/`
}

export default {
	domain: options.domain,
	host_images: options.host_images,
	version: options.app_version,
	app_name: options.app_name,
}
