const state = {
    example: null,
}
const mutations = {
    setExample: (state, example) => state.example = example,
}
const getters = {
    example: state => state.example,
}
const actions = {
    setExample: ({ commit }, example) => commit('setExample', example),
}

export default {
    name: 'example',
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}