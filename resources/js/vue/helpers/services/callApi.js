import axios from 'axios';
import { LoadingBar } from 'view-ui-plus';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
LoadingBar.config({
    height: 4
});
import { info, success, swr, warning } from "./message";

const WARNING_STATUS = [404, 401, 400];

export const callApi = async (method, url, data, dataType = 'data') => {
    LoadingBar.start();
    try {
        const res = await axios({
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: method,
            url: url,
            [dataType]: data,
        });

        LoadingBar.finish();

        if (res.data.message) {
            success(res.data.message);
        }
        return res;
    } catch (e) {
        const res = e.response;
        if (WARNING_STATUS.includes(res.status)) {
            if (res.data.message) warning(res.data.message);
        } else if (res.status == 422) {
            for (const key in res.data.errors) {
                info(res.data.errors[key][0]);
            }
        } else {
            swr();
        }

        LoadingBar.error()
        return res;
    }
}
