import { callApi } from "../../../helpers/services/callApi";

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
        checkRoute
    }
}
