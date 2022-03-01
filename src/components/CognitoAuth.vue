<script>
import { toRefs } from "vue";
import { Authenticator, AuthenticatorSignUpFormFields, AmplifyTextField, AmplifyCheckBox, useAuthenticator } from "@aws-amplify/ui-vue";
import { Auth } from "aws-amplify";

import "@aws-amplify/ui-vue/styles.css";

export default {
    components: {
        Authenticator,
        AuthenticatorSignUpFormFields,
        AmplifyTextField,
        AmplifyCheckBox
    },
    setup() {
        const { validationErrors } = toRefs(useAuthenticator());

        const services = {
            handleSignUp(formData) {
                let { username, password, attributes } = formData;

                return Auth.signUp({
                    username, password, attributes, clientMetadata: {
                        source: 'Web App' // Add stuff here for cognito triggers
                    }
                })
            },
            validateCustomSignUp(formData) {
                const errors = {};

                if (!formData.acknowledgement) {
                    errors.acknowledgement = 'You must agree to the Terms & Conditions.';
                }

                if (!formData['custom:fooBaz']) {
                    errors['custom:fooBaz'] = 'You must baz!';
                }

                return errors;
            },
        };

        return {
            validationErrors,
            services,
        };
    }
}
</script>

<template>
    <authenticator :services="services" :sign-up-attributes="['given_name']">
        <template v-slot="{ user, signOut }">
            <h1>Hello {{ user.username }}!</h1>
            <button @click="signOut">Sign Out</button>
        </template>

        <template v-slot:sign-up-fields>
            <!-- Standard fields - from `amplify pull` -->
            <authenticator-sign-up-form-fields />

            <!-- Amplify 'acknowledgement' checkbox -->
            <amplify-check-box :errorMessage="validationErrors.acknowledgement" />

            <!-- Custom Amplify attributes -->
            <amplify-text-field label="Foo Bar Field" :hide-label="false" name="custom:fooBar" />
            <amplify-text-field
                label="Foo Baz Field"
                :hide-label="false"
                :required="false"
                name="custom:fooBaz"
            />
            <!-- <amplify-text-field ... /> do not appear to have error message handling -->
            <p v-if="!!validationErrors['custom:fooBaz']" class="amplify-text amplify-field__error-message">{{ validationErrors['custom:fooBaz'] }}</p>
        </template>
    </authenticator>
</template>