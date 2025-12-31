const state = {
    publicSearch: null,
    publicSearchCollection: null,
    loadingRequest: null,

}
const mutations = {
    setPublicSearch: (state, payload) => state.publicSearch = payload,
    setPublicSearchCollection: (state, payload) => state.publicSearchCollection = payload,
    setLoadingRequest: (state, payload) => state.loadingRequest = payload
}
const getters = {
    publicSearch: state => state.publicSearch,
    publicSearchCollection: state => state.publicSearchCollection,
    loadingRequest: state => state.loadingRequest,
}
const actions = {
    setPublicSearch: ({ commit }, payload) => commit('setPublicSearch', payload),
    setPublicSearchCollection: ({ commit }, payload) => commit('setPublicSearchCollection', payload),
    setLoadingRequest: ({ commit }, payload) => commit('setLoadingRequest', payload),
}

export default {
    name: 'publicSearch',
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
