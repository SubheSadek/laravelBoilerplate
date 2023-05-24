

import { callApi } from '@/vue/helpers/services/callApi';
import { useMainStore } from '@/vue/store';
const storeMain = useMainStore();
import { useSearch } from '@/vue/helpers/services/global';
import { USER_ACTIVE_TXT, USER_BANNED_TXT, ALL_USER_STATUS } from '@/vue/helpers/services/utility';
import { toCapitalizeCase } from '@/vue/helpers/services/global';
export const useManageUser = () => {
    const { onSearch, onClear } = useSearch();
    const getUsers = async () => {
        storeMain.dataLoading = true;
        const res = await callApi('get', '/admin/manage/users', storeMain.params, 'params');
        if (res.data.success) {
            storeMain.setDataToList(res.data.json_data);
        }
        setTimeout(() => {
            storeMain.dataLoading = false;
        }, 200);
    }

    const updateStatus = async (userId, status) => {
        const data = formatStatusUpdateData(userId, status);

        storeMain.dataLoading = true;
        const res = await callApi('post', '/admin/manage/users/update-status', data);
        if (res.data.success) {

        }
        setTimeout(() => {
            storeMain.dataLoading = false;
        }, 200);
    }

    const formatStatusUpdateData = (userId, status) => {
        return {
            'userId': userId,
            'status': status,
        }
    }

    const allUserStatus = () => {
        return ALL_USER_STATUS.map((item) => {
            return {
                value: item,
                name: toCapitalizeCase(item),
                className: `_${item.toLowerCase()}`
            }
        });
    }

    return {
        getUsers,
        storeMain,
        onSearch,
        onClear,
        ACTIVE_TXT: USER_ACTIVE_TXT,
        BANNED_TXT: USER_BANNED_TXT,
        updateStatus,
        allUserStatus
    }
}
