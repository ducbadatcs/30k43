<script lang="ts" setup>
import { computed, ref } from "vue";
import { jobs } from "./jobs";

const jobCategories = jobs.map((job) => job.category);

const formElement = ref<HTMLFormElement | null>(null);

const firstName = defineModel<string>("firstName", { default: "" });
const lastName = defineModel<string>("lastName", { default: "" });
const userName = defineModel<string>("userName", { default: "" });
const password = defineModel<string>("password", { default: "" });
const confirmPassword = defineModel<string>("confirmPassword", { default: "" });
const email = defineModel<string>("email", { default: "" });
const streetAddress = defineModel<string>("streetAddress", { default: "" });
const suburb = defineModel<string>("suburb", { default: "" });
const postCode = defineModel<string>("postcode", { default: "" });
const mobileNumber = defineModel<string>("mobileNumber", { default: "" });
const dateOfBirth = defineModel<string>("dateOfBirth", { default: "" });
const preferredJobCategory = defineModel<string>("preferredJobCategory", { default: "" });

const showTermsAndConditions = defineModel<boolean>("showTermsAndConditions", { default: false });

// letters only, required
const checkFirstName = computed<boolean>(() => {
	return /^[a-zA-Z]+$/.test(firstName.value);
});

// letters only, required
const checkLastname = computed<boolean>(() => {
	return /^[a-zA-Z]+$/.test(lastName.value);
});

// Minimum 3 characters, required
const checkUsername = computed<boolean>(() => {
	return userName.value.length >= 3;
});

// Minimum 8 characters, must include at least one special character ($, %, ^, &, *), required

// need this to check password

const hasSpecialChar = (s: string): boolean => {
	for (const char of s) {
		if ("$%^&*".includes(char)) {
			return true;
		}
	}
	return false;
};

const checkPassword = computed<boolean>(() => {
	return password.value.length >= 8 && hasSpecialChar(password.value);
});

const checkConfirmPassword = computed<boolean>(() => {
	return password.value == confirmPassword.value;
});

const checkEmail = computed<boolean>(() => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
});

const checkStreetAddress = computed<boolean>(() => {
	return streetAddress.value.length <= 40;
});

const checkSuburb = computed<boolean>(() => {
	return suburb.value.length <= 20;
});

const checkPostCode = computed<boolean>(() => {
	return postCode.value.length == 4 && /^\d+$/.test(postCode.value);
});

// Exactly 10 digits, must start with 04
const checkMobileNumber = computed<boolean>(() => {
	return (
		mobileNumber.value.length == 10 &&
		/^\d+$/.test(mobileNumber.value) &&
		mobileNumber.value.startsWith("04")
	);
});

const checkDateOfBirth = computed<boolean>(() => {
	// get date today
	const today = new Date();

	const dob = new Date(dateOfBirth.value);

	// approximate check
	let age = today.getFullYear() - dob.getFullYear();
	const missing_month = today.getMonth() - dob.getMonth();
	if (missing_month < 0 || (missing_month == 0 && today.getDate() < dob.getDate())) {
		age -= 1;
	}

	return age >= 16;
	// return Date(today.getTime() - dob.getTime());
});

const showError = computed<boolean>(() => {
	return !(
		checkFirstName.value &&
		checkLastname.value &&
		checkEmail.value &&
		checkUsername.value &&
		checkPassword.value &&
		checkConfirmPassword.value &&
		checkStreetAddress.value &&
		checkSuburb.value &&
		checkPostCode.value &&
		checkMobileNumber.value &&
		checkDateOfBirth.value
	);
});

const isSubmitting = ref(false);
const handleSubmit = (event: Event) => {
	event.preventDefault();
	isSubmitting.value = true;
	if (showError.value) {
		return;
	}
	formElement.value?.submit();
};
</script>

<template>
	<div class="w-75 p-3">
		<form
			ref="formElement"
			@submit="handleSubmit"
			method="post"
			action="http://mercury.swin.edu.au/it000000/formtest.php"
		>
			<label for="input-first-name">First Name: </label>
			<input
				type="text"
				name="firstName"
				id="input-first-name"
				v-model="firstName"
				required
			/>
			<!-- <span class="" v-if="firstName.length < 3">First Name must have at least 3 characters</span> -->
			<br />
			<label for="input-last-name">Last Name:</label>
			<input
				type="text"
				name="lastName"
				id="input-last-name"
				v-model="lastName"
				required
			/><br />
			<label for="input-user-name">User Name: </label>
			<input
				type="text"
				name="userName"
				id="input-user-name"
				v-model="userName"
				required
			/><br />
			<label for="input-password">Password: </label>
			<input
				type="password"
				name="password"
				id="input-password"
				v-model="password"
				required
			/><br />
			<label for="input-confirm-password">Confirm Password: </label>
			<input
				type="password"
				name="confirmPassword"
				id="input-confirm-password"
				v-model="confirmPassword"
			/><br />
			<label for="input-email">Email: </label>
			<input type="text" name="email" id="input-email" v-model="email" required /><br />
			<label for="input-street-address">Street Address: </label>
			<input
				type="text"
				name="streetAddress"
				id="input-street-address"
				v-model="streetAddress"
			/><br />
			<label for="input-suburb">Suburb: </label>
			<input type="text" name="suburb" id="input-suburb" v-model="suburb" /><br />
			<label for="input-postcode">Postcode: </label>
			<input
				type="text"
				name="postCode"
				id="input-postcode"
				v-model="postCode"
				required
			/><br />
			<label for="input-mobile-number">Mobile Number: </label>
			<input
				type="text"
				name="mobileNumber"
				id="input-mobile-number"
				v-model="mobileNumber"
			/><br />
			<label for="input-date-of-birth">Date Of Birth: </label>
			<input
				type="date"
				name="dateOfBirth"
				id="input-date-of-birth"
				v-model="dateOfBirth"
				required
			/><br />
			<label for="input-preferred-job-category">Preferred Job Category: </label>
			<select
				name="preferedJobCategory"
				id="input-prefered-job-category"
				v-model="preferredJobCategory"
				required
			>
				<option v-for="job in jobCategories" :key="job" :value="job">
					{{ job }}
				</option>
			</select>
			<!-- job category requires a select -->
			<!-- <input @click="handleSubmit"/> -->
			<input type="submit" value="Submit!" />
		</form>
	</div>

	<div class="w-25 p-3 text-danger" v-if="isSubmitting">
		<ul>
			<li v-if="!checkFirstName && firstName.length > 0">First Name can only have letters</li>
			<li v-if="!checkLastname && lastName.length > 0">Last Name can only have letters</li>
			<li v-if="!checkUsername && userName.length > 0">
				Username must have at least 3 characters
			</li>

			<li v-if="!checkPassword && password.length > 0">
				Password must have at least 8 characters and a special character ($, %, ^, &, *)
			</li>
			<li v-if="!checkConfirmPassword && password.length > 0">
				Confirm Password must be the same as password
			</li>
			<li v-if="!checkEmail && email.length > 0">Email must be valid</li>
			<li v-if="!checkStreetAddress && streetAddress.length > 0">
				Street Address can not exceed 40 characters
			</li>
			<li v-if="!checkSuburb && suburb.length > 0">Suburb can not exceed 20 characters</li>
			<li v-if="!checkPostCode && postCode.length > 0">
				Postcode must have exactly 4 numeric characters
			</li>
			<li v-if="!checkMobileNumber && mobileNumber.length > 0">
				Mobile Number must have exactly 10 characters and start with 04
			</li>
			<li v-if="!checkDateOfBirth">Applicant must be at least 16 years old.</li>
		</ul>
	</div>

	<!-- terms and conditions -->
	<button @click="showTermsAndConditions = !showTermsAndConditions">
		Show Terms And Conditions
	</button>
	<div v-if="showTermsAndConditions">
		<h1>Terms And Conditions</h1>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita molestias exercitationem
		sapiente minus eveniet blanditiis natus quam aspernatur, ut magni fugiat pariatur doloribus
		sit iure, iusto ea animi distinctio qui.
	</div>
</template>
