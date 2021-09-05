import {
    getPosts,
    getUsers
} from "../api-service";


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const actions = {

    addPost({
        commit,
    }, payload) {
        commit("ADD_POST", payload);
    },


    async fetchPosts({
        commit,
        state
    }) {
        const response = await getPosts();

        commit("SET_POSTS", (response.data.map(item => {
            const user = state.users.find(u => u.id === item.userId);
            const date = new Date(item.publishDate)
            return {
                id: item.id,
                image: item.image,
                likes: item.likes,
                publishDate:`${date.getFullYear()} ${monthNames[date.getMonth()]} ${date.getDate()}`,
                userName: `${user.firstName} ${user.lastName}`,
                tags: item.tags,
                text: item.text,
                avatar: user.avatar
            }
        })));
    },

    setFilter({
        commit,
    }, payload) {
        commit("SET_FILTER", payload);

    },

    setUsers({
        commit
    }, payload) {
        commit("SET_USERS", payload);
    },


    async fetchUsers({
        commit
    }) {
        const response = await getUsers();
        commit("SET_USERS", (response.data));
    },

}
export default actions;

