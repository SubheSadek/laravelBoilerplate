import { callApi } from "../../../helpers/services/callApi";
import { useMainStore } from '@/vue/store';
export const useMain = () => {

    const logout = async () => {
		let res = await callApi('get', '/admin/auth/logout');
		if (res.data.success) {
			window.location.reload();
		}
    }

    const checkRoute = (route) => {
    	return route.meta.isHide;
    }

    return {
        logout,
        checkRoute,
        useMainStore
    }
}
