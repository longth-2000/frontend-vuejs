export const API = {
    USER: {
        login: () => ({
            endpoint: "",
            method: "POST",
        }),
        register: () => ({
            endpoint: "register",
            method: "POST"
        })
    },
    PROFILE: {
        createProfile: () => ({
            endpoint: "profile/create-profile",
            method: "POST"
        }),
        getProfileById: (idUser) => ({
            endpoint: `profile/${idUser}`,
            method: "GET"
        }),
        getProfileByArray: () => ({
            endpoint: "profile/getByList",
            method: "GET"
        }),
        editProfile: (idUser) => ({
            endpoint: `profile/edit/${idUser}`,
            method: "PUT"
        }),
        changeAvatar: (idUser) => ({
            endpoint: `profile/change-avatar/${idUser}`,
            method:"POST"
        })
    },
    ADDRESS: {
        province: () => ({
            endpoint: "address/province",
            method: "GET"
        }),
        district: (idProvince) => ({
            endpoint: `address/province/${idProvince}/district`,
            method: "GET"
        })
    },
    REACT: {
        react: () => ({
            endpoint: "react",
            method: "POST",
        }),
        delete: () => ({
            endpoint: "react/delete",
            method: "DELETE"
        }),
        getLikeByID: (action, idUser) => ({
            endpoint: `react/${action}/${idUser}`,
            method: "GET"
        }),

    },
    SEARCH: {
        basicSearch: () => ({
            endpoint: "search",
            method: "POST"
        }),
        advanceSearch: () => ({
            endpoint: "search/advanced",
            method: "POST"
        })
    },
    CHAT: {
        insertContent: () => ({
            endpoint: "chat",
            method: "POST"
        }),
        displayContent: () => ({
            endpoint: "chat/display",
            method:"GET"
        }),
        displayContentByID: (id) => ({
            endpoint:`chat/display/${id}`,
            method:"GET"
        })
    }
}