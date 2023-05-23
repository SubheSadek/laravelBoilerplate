
import { useMainStore } from '@/vue/store';
import { reactive } from 'vue';
import { callApi } from '../../../helpers/services/callApi';
const storeMain = useMainStore();

export const useManageUser = () => {
    const params = reactive({
        search: '',
        page: 1,
        pageSize: 10,
    });
    const getUsers = async () => {

        storeMain.dataLoading = true;
        const res = await callApi('get', '/admin/manage/users', params, 'params');
        if (res.data.success) {
            storeMain.setDataToList(res.data.json_data);
            // this.$store.commit('setDataList', res.data);
        }
        setTimeout(() => {
            storeMain.dataLoading = false;
        }, 200);
    }

    return {
        params,
        getUsers,
        storeMain
    }
}
