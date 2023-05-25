<template>

    <Modal
        :styles="{top: '20px'}" v-model="storeMain.isModal"
        :loading="isLoading" width="1200" footer-hide draggable
        class-name="vertical-center-modal" scrollable
        :title="(editData ? 'Update' : 'Create') + ' User'">

        <div class="modal-body pt-0">
            <Form ref="formRef" :model="formData" :rules="ruleValidate" class="form w-100">

                <!-- <ProfilePic
                    v-model:profilePic="form.profile_pic"
                    v-model:preview="form.preview"
                    :is-show="isShow"
                /> -->

                <Row :gutter="16">

                    <Col span="12">
                        <div class="d-flex flex-column fv-row">
                            <FormItem class="form-label fs-6 fw-bolder text-dark" label="Name" prop="name">
                                <Input size="large"
                                    :border="!isShow" :readonly="isShow"
                                    v-model.trim="formData.name"
                                    type="text" placeholder="Name"
                                    show-word-limit maxlength="255"
                                    autocomplete="off">
                                </Input>
                            </FormItem>
                        </div>
                    </Col>

                    <Col span="12">
                        <div class="d-flex flex-column fv-row">
                            <FormItem class="form-label fs-6 fw-bolder text-dark" label="Email" prop="email">
                                <Input size="large"
                                    :border="!isShow" :readonly="isShow"
                                    v-model.trim="form.email"
                                    type="text" placeholder="Email"
                                    show-word-limit maxlength="255"
                                    autocomplete="off">
                                </Input>
                            </FormItem>
                        </div>
                    </Col>

                    <Col span="12">
                        <div class="d-flex flex-column fv-row">
                            <FormItem class="form-label fs-6 fw-bolder text-dark" label="Phone (+88017XXXXXXXX)" prop="phone">
                                <Input size="large"
                                    :border="!isShow"
                                    :readonly="isShow"
                                    v-model.trim="form.phone"
                                    type="text" placeholder="+88017XXXXXXXX"
                                    autocomplete="off">
                                </Input>
                            </FormItem>
                        </div>
                    </Col>

                </Row>

                <div class="modal-button" v-if="!isShow">

                    <Button
                        @click="handleSubmit('form')" size="large"
                        :loading="isLoading"
                        :disabled="isLoading"
                        icon="md-add" type="primary">
                        {{ isLoading ? 'Please wait...' : 'Save Changes' }}
                    </Button>

                    <Button @click="storeMain.isModal4 = false;" size="large" type="default">Close</Button>
                </div>

                <div v-else class="modal-button">
                    <Button @click="storeMain.isModal4 = false;" long size="large" type="primary"> ❌ Close</Button>
                </div>

            </Form>
        </div>
    </Modal>
</template>

<script setup>

import {
    Modal,
    Form,
    Row,
    Col,
    FormItem,
    Input,
    Button,
} from 'view-ui-plus';
import { useCreateOREditUser } from '../js/administration';
defineProps(['editData', 'isShow']);
const {
    formData,
    ruleValidate,
    storeMain,
    isLoading,
    formRef
} = useCreateOREditUser();


// import ProfilePic from './ProfilePic.vue'
</script>

