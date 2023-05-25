

import { callApi } from '@/vue/helpers/services/callApi';
import { useMainStore } from '@/vue/store';
const storeMain = useMainStore();
import { useSearch } from '@/vue/helpers/services/global';
import { ALL_USER_STATUS } from '@/vue/helpers/services/utility';
import { toCapitalizeCase } from '@/vue/helpers/services/global';
import { reactive, ref } from 'vue';
import { warning } from '@/vue/helpers/services/message'

export const useManageUser = () => {

    const { onSearch, onClear } = useSearch();
    const getUsers = async () => {
        storeMain.setDataLoading(true);
        const res = await callApi('get', '/admin/manage/users', storeMain.params, 'params');
        if (res.data.success) {
            storeMain.setDataToList(res.data.json_data);
        }
        setTimeout(() => {
            storeMain.setDataLoading(false);
        }, 200);
    }

    const updateStatus = async (user, status) => {

        const data = formatStatusUpdateData(user.id, status);
        user.isStatusChange = true;

        const res = await callApi('post', '/admin/manage/users/update-status', data);
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
        getUsers,
        storeMain,
        onSearch,
        onClear,
        updateStatus,
        allUserStatus
    }
}


export const useCreateOREditUser = () => {

    const isLoading = ref(false);
    const formRef = ref(null);
    let formData = reactive({
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
            { required: true, message: 'Please input phone number', trigger: 'blur' },
            { max: 20, message: 'Phone must not be greater than 15 characters long', trigger: 'blur' },
        ],
        email: [
            { required: true, message: 'Please input email', trigger: 'blur' },
            { max: 255, message: 'Email must not be greater than 255 characters long', trigger: 'blur' },
            { type: 'email', message: 'Please input a valid email address', trigger: 'blur' },
        ],
    });


    const handleSubmit = () => {
        formRef.value.validate(async (valid) => {
            if (!valid) {
                warning('Please fill form correctly');
                return;
            }

            let method = this.editData ? 'PUT' : 'POST';
            let url =
                this.editData ?
                `/admin/administration/admins/update-user/${this.editData.id}` :
                '/admin/administration/admins/create-user';

            isLoading.value = true;

            this.headers['Content-Type'] = 'multipart/form-data';
            const res = await this.callApi('POST', url, this.form);
            if (res.status == 200) {
                this.storeMain.isModal4 = false;
                let data = res.data.json_data;
                if (this.$route.name === 'users') {
                    this.$store.commit('pushDataList', { data, method });
                }

                this.$emit('createUser', {id: data.id, name: data.name, phone: data.phone})
            }
            this.headers['Content-Type'] = 'application/json';

            isLoading.value = false;


            })
    }

    return {
        formData,
        ruleValidate,
        storeMain,
        isLoading,
        formRef
    }
}
