export const state = () => ({
	token: "",
	API: "https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/v1",
	// API: "https://XXXXXXXXX.execute-api.eu-west-1.amazonaws.com/dev",
})

export const mutations = {
	token (state, token) {
		state.token = token
	},
}

export const getters = {
	token (state) {
		return state.token
	},
	API (state) {
		return state.API
	},
}