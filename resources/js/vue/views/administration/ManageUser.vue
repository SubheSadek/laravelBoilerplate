<template>
    <div class="card _box_shadow mb-5 mb-xl-8">
        <!--begin::Header-->
        <div class="card-header border-0 pt-5">

            <h3 class="card-title align-items-start flex-column">
                <span class="card-label  fs-3 mb-1">{{ $route.meta.title }} Table</span>
                <!-- <span class="text-muted mt-1 fw-bold fs-7">Total Records : {{ dataList.total }}</span> -->
            </h3>

            <div class="d-flex align-items-center">

                <!-- <div class="position-relative w-md-200px me-md-2">
                    <Input @input="searchMethod()" clearable @on-clear="searchMethod()" v-model="params.search"
                        type="text" size="large" class="custom_inp" prefix="ios-search"
                        placeholder="Search by name, phone and email.." />
                </div> -->

                <!-- <div class="position-relative w-md-100px me-md-2">
                    <SelectStaticOption v-model:formValue="params.status" v-model:initialData="types"
                        :title="`Status`" @onChange="searchMethod" />
                </div> -->

            </div>

            <div class="card-toolbar">
                <!-- <a @click="excelExport()" href="javascript:void(0)" class="btn btn-sm btn-bg-primary btn-primary me-2">
                    <svg-icon name="excel"></svg-icon>
                    Export
                </a>
                <a @click="editRow(null)" href="javascript:void(0)" class="btn btn-sm btn-light-primary">
                    <svg-icon name="plus"></svg-icon>
                    New {{ $route.name == 'users' ? 'user' : 'User' }}
                </a> -->
            </div>
        </div>

        <div class="card-body py-3">

            <div class="table-responsive">
                 <!-- -->
                <Transition>
                    <table v-if="!storeMain.dataLoading" class="table table-striped align-middle gs-0 gy-4">

                        <thead>

                            <tr class="fw-bolder text-white bg-primary">
                                <!-- <th class="ps-4 min-w-50px"></th> -->
                                <th class="min-w-200px">Name</th>
                                <th class="min-w-100px">Phone</th>
                                <th class="min-w-100px">Email</th>
                                <th class="min-w-50px">Status</th>
                                <th class="min-w-100px"></th>
                            </tr>

                        </thead>

                        <tbody>

                            <tr v-for="(user) in storeMain.getDataList.data" :key="(user.id)">

                                <!-- <td>
                                    <ImgPreview :singleImage="user.profile_pic" :addLink="true" />
                                </td> -->

                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <a
                                                href="javascript:void(0)"
                                                class="text-dark _disable_link text-hover-primary mb-1 fs-6">
                                                {{ user.name }}
                                            </a>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <a
                                                href="javascript:void(0)"
                                                class="text-dark _disable_link text-hover-primary mb-1 fs-6">
                                                {{ user.phone }}
                                            </a>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <a
                                                href="javascript:void(0)"
                                                class="text-dark _disable_link text-hover-primary mb-1 fs-6">
                                                {{ user.email }}
                                            </a>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div class="d-flex align-items-center">
                                        <div class="d-flex justify-content-start flex-column">
                                            <Select @on-change="e => handleChange(e, user)" v-model="user.status"
                                                size="small" :disabled="user.isLoading"
                                                :class="user.status == 'ACTIVE' ? 'selected_txt_active' : 'selected_txt_banned'"
                                                style="width:100px">
                                                <Option value="ACTIVE"><span style="color:#19be6b">Active</span>
                                                </Option>
                                                <Option value="BANNED"><span style="color:#ed4014">Inactive</span>
                                                </Option>
                                            </Select>
                                        </div>
                                    </div>
                                </td>

                                <td class="text-end">

                                    <a @click="editRow(user, 'isLoading', false)"
                                        title="Edit" href="javascript:void(0)"
                                        :class="user.isLoading ? 'disabled' : ''"
                                        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                        <svg-icon :name="user.isLoading ? 'loading' : 'edit'"></svg-icon>
                                    </a>

                                    <a @click="editRow(user, 'isLoading3', true)"
                                        title="View Details" href="javascript:void(0)"
                                        :class="user.isLoading ? 'disabled' : ''"
                                        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                                        <svg-icon :name="user.isLoading3 ? 'loading' : 'eye'"></svg-icon>
                                    </a>

                                    <a @click="deleteUser(user)" title="Delete" href="javascript:void(0)"
                                        class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
                                        <svg-icon name="delete"></svg-icon>
                                    </a>

                                </td>

                            </tr>

                        </tbody>
                    </table>
                </Transition>

                <div v-if="!storeMain.getDataList.total" class="no_data">
                    <h2>No Data Available</h2>
                </div>

            </div>
        </div>
    </div>

    <Page
        v-if="storeMain.getDataList"
        @on-page-size-change="e => (params.pageSize = e, getUsers())"
        v-model="params.page"
        @on-change="getUsers" :total="storeMain.getDataList.total"
        show-sizer style="text-align:center;"
    />

    <!-- <createOrEditModal v-if="$store.state.isModal" :editData="editData" />
    <createOrEditUserModal
        v-if="$store.state.isModal4"
        :editData="editData" :is-show="isShow"
     /> -->

</template>

<script setup>
import lang from 'view-ui-plus/dist/locale/en-US';
import {
    Select,
    Option,
    Input,
    Button,
    Page,
    locale
} from 'view-ui-plus';

locale(lang);
import './css/administration.css';
import { useManageUser } from './js/administration';
const { params, getUsers, storeMain } = useManageUser();
getUsers();
// import { useMainStore } from '@/vue/store';
// const storeMain = useMainStore();

// import createOrEditModal from './components/createOrEditModal.vue'
// import SelectStaticOption from '../../../Helpers/globalComponents/SelectStaticOption.vue'
// import createOrEditUserModal from './components/createOrEditUserModal.vue'

// import ImgPreview from '../../../Helpers/globalComponents/ImagePreview.vue'

// export default {
//     name: 'User',
//     data() {
//         return {
//             editData: null,
//             types: [
//                 {
//                     value: 'ACTIVE',
//                     name: 'Active'
//                 },
//                 {
//                     value: 'BANNED',
//                     name: 'Inactive'
//                 },
//             ],
//             feeTypes: [],
//             member: {},
//             isShow: false,
//         }
//     },
//     watch: {
//         $route(to, from) {
//             if (to.name === 'users') {
//                 this.getUsers();
//             }
//         },
//     },
//     methods: {

//         async restoreUser(user) {
//             let msgTxt = 'Are u sure to restore this user ?';
//             const url = `/user/useristration/restore-user/${user.id}`;
//             await askForConfirm(this.callApi, url, 'GET', msgTxt, this.getUsers);
//         },

//         excelExport() {
//             const formatRequest = formateExportData(this.params.filter_date, this.dataList.data, this.dataList.total);
//             if (!formatRequest) {
//                 this.i('Nothing to export !');
//                 return;
//             }
//             window.location.href = '/user/excel/user-exports' + formatRequest;
//         },

//         async addMemberMethod(row) {
//             this.member = row;
//             row.isLoading2 = true;
//             const res = await this.callApi('get', `/user/societies/society-member-fees/fees-list`);
//             if (res.data.success) {
//                 this.feeTypes = res.data.json_data;
//                 this.$store.state.isModal3 = true;
//             }
//             row.isLoading2 = false;
//         },
//         async handleChange(value, row) {
//             row.isLoading = true;
//             let obj = {
//                 'status': value,
//             }
//             const res = await this.callApi('POST', `/user/useristration/change-status-alt/${row.id}`, obj);
//             if (res.status === 200) {
//                 //    row.status = res.data.success
//             }
//             row.isLoading = false;
//         },
//         changeStatus(row) {
//             let role = this.$route.name == 'users' ? 'user' : 'User';
//             let status = row.status == 'ACTIVE' ? 'Banned' : 'Active';
//             this.$Modal.confirm({
//                 title: 'Warning',
//                 okText: 'Yes',
//                 cancelText: 'No',
//                 content: `Are you sure to ${status} this ${role}?`,
//                 onOk: async () => {
//                     const res = await this.callApi('POST', `/user/useristration/change-status/${row.id}`);
//                     if (res.status === 200) {
//                         row.status = res.data.success
//                     }
//                 }
//             });
//         },


//         async deleteUser(user) {
//             let msgTxt = 'Are u sure delete this user ?';
//             const url = `/user/useristration/users/${user.id}`;
//             await askForConfirm(this.callApi,url, 'DELETE', msgTxt, this.getUsers);
//         },

//         async editRow(row, loading, isShow = false) {
//             if (!row) {
//                 this.editData = null;

//                 if (this.$route.name == 'users') {
//                     this.$store.state.isModal4 = true
//                 }
//                 else {
//                     this.$store.state.isModal = true
//                 }

//                 return;
//             }
//             else if (row && this.$route.name == 'users') {
//                 row[loading] = true;
//                 const params = {
//                     user_type: this.params.user_type
//                 }
//                 const res = await this.callApi('get', `/user/useristration/users/${row.id}/edit?user_type=USER`, null, params);
//                 if (res.data.success) {
//                     this.isShow = isShow;
//                     this.editData = res.data.json_data;
//                     this.$store.state.isModal4 = true;
//                 }
//                 row[loading] = false;
//                 return;
//             }
//             this.editData = {
//                 id: row.id,
//                 name: row.name,
//                 email: row.email,
//                 role_id: row.role_id,
//                 phone: row.phone
//             };
//             this.$store.state.isModal = true;
//         },
//         searchMethod(values = null, filter_field = null) {
//             this.params.filter_date = checkFilteredArray(values, filter_field)

//             this.params.page = 1;
//             this.getUsers();
//         },
//         resetParams() {
//             this.params = {
//                 search: '',
//                 pageSize: 10,
//                 page: 1,
//             }
//         },
//     },
//     created() {
//         let type = this.$route.query?.type;
//         if (type) {
//             this.params.user_type = type.toUpperCase();
//         }
//         this.getUsers();
//         this.setCss('1300px');
//     }
// }
</script>


