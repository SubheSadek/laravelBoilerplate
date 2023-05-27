
import { infoMsg } from "./message";
import { useMainStore } from '@/vue/store';

export const baseUrl = window.baseUrl;
export const defaultImg = (baseUrl + 'assets/images/blank_image.svg');

export const useSearch = () => {
    const storeMain = useMainStore();

    const onSearch = (callback) => {
        if (!storeMain.params.searchTxt) return infoMsg('Please enter some text!');
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

export const addUrl = (img) => {
    if (!img) return defaultImg;
    return (baseUrl + img);
}
