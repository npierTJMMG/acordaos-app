import PublicLayout from 'src/layouts/Public'
import NotFound from 'src/pages/Errors/NotFoundPage.vue'

const routes = [
	{
		path: '/',
		component: PublicLayout,
		redirect: 'pesquisa',
		children: [{
			path: 'pesquisa',
			component: () => import('src/pages/Public/PublicSearch.vue'),
			name: 'PublicSearch',
			meta: {
				title: 'PublicSearch',
				auth: false
			}
		}
	]
	},
	{
		path: '*',
		component: NotFound
	}
];

export default routes
