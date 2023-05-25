import { defineStore } from "pinia";

const authUser = window.authUser ? window.authUser : null;
export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        authUser : authUser,
        isModal : false,
        isModal2 : false,
        isModal3 : false,
        dataLoading : false,
        dataList : [],
        dataListTwo: [],
        params: {
            searchTxt: '',
            page: 1,
            pageSize: 10,
        }
    }),

    getters: {
        getDataList: (state) => {
            return state.dataList;
        },
        getDataListTwo: (state) => {
            return state.dataListTwo;
        },
    },

    actions: {
        setAuthUser(data) {
            this.authUser = data;
        },
        setDataLoading(value) {
            this.dataLoading = value;
        },
        setDataToList(data) {
            this.dataList = data;
        },
        setDataToListTwo(data) {
            this.dataListTwo = data;
        },
        pushDataToList({data, method}) {
            if(method == 'POST') {
                this.dataList.data.unshift(data);
                this.dataList.total += 1;
            }
            else if (method == 'PUT') {
                let index = this.dataList.data.findIndex(item => item.id == data.id);
                this.dataList.data.splice(index, 1, data);
            }
        },
        pushDataToListTwo({data, method}) {
            if(method == 'POST') {
                this.dataListTwo.data.unshift(data);
                this.dataListTwo.total += 1;
            }
            else if (method == 'PUT') {
                let index = this.dataListTwo.data.findIndex(item => item.id == data.id);
                this.dataListTwo.data.splice(index, 1, data);
            }
        },
    }

});
