
import { info } from "./message";
import { useMainStore } from '@/vue/store';

export const baseUrl = window.baseUrl;


export const useSearch = () => {
    const storeMain = useMainStore();

    const onSearch = (callback) => {
        if (!storeMain.params.searchTxt) {
            info('Please enter some text!');
            return;
        }
        storeMain.params.page = 1;
        callback();
    }

    const onClear = (callback) => {
        if (storeMain.params.searchTxt) return;
        storeMain.params.page = 1;
        callback();
    }

    return {
        onSearch,
        onClear
    }
}

export const toCapitalizeCase = (txt) => {
    if (!txt) return txt;
    txt = txt.toLowerCase();
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}
