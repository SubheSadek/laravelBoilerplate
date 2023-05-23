import { defineStore } from "pinia";


export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        // authUser : auth,
        isModal : false,
        isModal2 : false,
        isModal3 : false,
        isModal4 : false,
        dataLoading : false,
        dataList : [],
        dataListTwo : [],
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
