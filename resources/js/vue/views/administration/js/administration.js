
import { callApi } from '@/vue/helpers/services/callApi';
import { useMainStore } from '@/vue/store';

import { useSearch } from '@/vue/helpers/services/global';
import { ALL_USER_STATUS } from '@/vue/helpers/services/utility';
import { toCapitalizeCase } from '@/vue/helpers/services/global';
import { reactive, ref } from 'vue';
import { formValidationFailedMsg } from '@/vue/helpers/services/message'

export const useManageUser = () => {

    const storeMain = useMainStore();
    const { onSearch, onClear } = useSearch();
    let editData = ref(null);
    let isReadonly = ref(false);

    const getUsers = async () => {
        storeMain.setDataLoading(true);
        const res = await callApi('get', '/admin/manage/user', storeMain.params, 'params');
        if (res.data.success) {
            storeMain.setDataToList(res.data.json_data);
        }
        setTimeout(() => {
            storeMain.setDataLoading(false);
        }, 200);
    }

    const openAddUserModel = () => {
        editData.value = null;
        storeMain.isModal = true;
    }

    const openEditUserModel = (user, loader) => {
        user[loader] = true;
        editData.value = user;
        storeMain.isModal = true;
        user[loader] = false;
    }

    const updateStatus = async (user, status) => {

        const data = formatStatusUpdateData(user.id, status);
        user.isStatusChange = true;

        const res = await callApi('post', '/admin/manage/user/update-status', data);
        if (res.data.success) { }

        setTimeout(() => {
            user.isStatusChange = false;
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
        editData,
        isReadonly,
        getUsers,
        openAddUserModel,
        openEditUserModel,
        storeMain,
        onSearch,
        onClear,
        updateStatus,
        allUserStatus
    }
}


export const useCreateOREditUser = () => {

    const storeMain = useMainStore();

    const isLoading = ref(false);
    const formRef = ref(null);

    const formData = reactive({
        name: null,
        email: null,
        phone: null,
        profile_pic: null,
        preview: null,

    });

    const ruleValidate = reactive({
        name: [
            { required: true, message: 'Please input name', trigger: 'blur' },
            { max: 255, message: 'Name must not be greater than 255 characters long', trigger: 'blur' },
        ],
        phone: [
            { required: false, message: 'Please input phone number', trigger: 'blur' },
            { max: 20, message: 'Phone must not be greater than 15 characters long', trigger: 'blur' },
        ],
        email: [
            { required: true, message: 'Please input email', trigger: 'blur' },
            { max: 255, message: 'Email must not be greater than 255 characters long', trigger: 'blur' },
            { type: 'email', message: 'Please input a valid email address', trigger: 'blur' },
        ],
    });



    const handleSubmit = (editData) => {
        if (editData) {
            return updateUser(editData.id);
        }
        return createUser();
    }


    const createUser = () => {
        formRef.value.validate(async (valid) => {
            if (!valid) return formValidationFailedMsg();

            isLoading.value = true;

            const res = await callApi('POST', '/admin/manage/user/store', formData);
            if (res.data.success) {

                storeMain.isModal = false;
                let data = res.data.json_data;
                storeMain.pushDataToList(data);

            }

            isLoading.value = false;

        })

    }


    const updateUser = (userId) => {
        formRef.value.validate(async (valid) => {
            if (!valid) return formValidationFailedMsg();

            isLoading.value = true;

            const res = await callApi('PUT', '/admin/manage/user/update/' + userId, formData);
            if (res.data.success) {

                storeMain.isModal = false;
                let data = res.data.json_data;
                storeMain.replaceWithUpdatedData(data);

            }

            isLoading.value = false;

        })
    }


    const setEditData = (user) => {
        formData.name = user.name,
        formData.email = user.email,
        formData.phone = user.phone,
        formData.profile_pic = user.profile_pic,
        formData.preview = user.preview
    }

    return {
        storeMain,
        isLoading,
        formRef,
        formData,
        ruleValidate,
        handleSubmit,
        setEditData
    }
}
