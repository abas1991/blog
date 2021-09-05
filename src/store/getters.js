const getters = {
    filteredPosts: state => {
        return state.filter ?
            state.posts.filter(u => u.text.toLowerCase().includes(state.filter.toLowerCase())) :
            state.posts;
    },
    currentFilter: state => {
        return state.filter;
    },
    noPostsFound: (state, getters) => {
        return (state.posts.length === 0 || getters.filteredPosts.length === 0);
    },
    isFetched: (state) => {
        return state.isFetched
    }
}

export default getters;