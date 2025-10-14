const app = Vue.createApp({
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      streetAddress: "",
      suburb: "",
      postcode: "",
      mobileNumber: "",
      showTermsAndConditions: false,
    };
  },

  methods: {
    checkNames() {
      return (
        this.firstName.length > 0 &&
        this.lastName.length > 0 &&
        this.userName.length > 0
      );
    },

    checkPasswords() {
      let hasSpecialCharacter = false;
      for (char of this.password) {
        if ("$%^&*".includes(char)) {
          hasSpecialCharacter = true;
          break;
        }
      }

      if (this.password.length < 8) {
        console.log("Password too short");
      }

      return (
        hasSpecialCharacter &&
        this.password.length >= 8 &&
        this.confirmPassword == this.password
      );
    },

    checkEmail() {
      // i just steal this
      function validateEmail(email) {
        const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return res.test(String(email).toLowerCase());
      }

      return validateEmail(this.email);
    },

    checkStreetAddressAndSuburb() {
      return this.streetAddress.length <= 40 && this.suburb.length <= 20;
    },

    checkPostCode() {
      let isAllDigits = true;
      for (char of this.postcode) {
        if (
          !(
            "0".charCodeAt() <= char.charCodeAt() &&
            char.charCodeAt() <= "9".charCodeAt()
          )
        ) {
          isAllDigits = false;
        }
      }
      return isAllDigits && this.postcode.length == 4;
    },

    checkMobileNumber() {
      let validMobileNumber =
        this.mobileNumber.length == 10 && this.mobileNumber.startsWith("04");

      return validMobileNumber;
    },

    handleSubmit(event) {
      let nameOk = this.checkNames();
      if (!nameOk) {
        if (this.firstName.length == 0) {
          console.log("Empty first name");
        }
        if (this.lastName.length == 0) {
          console.log("Empty last name");
        }
        if (this.userName.length == 0) {
          console.log("Empty username");
        }
      }
      let passwordsOk = this.checkPasswords();
      if (!passwordsOk) {
        let hasSpecialCharacter = false;
        for (char of this.password) {
          if ("$%^&*".includes(char)) {
            hasSpecialCharacter = true;
            break;
          }
        }

        if (!hasSpecialCharacter) {
          console.log("Password has no special character");
        }

        if (this.password.length == 0 || this.confirmPassword.length == 0) {
          console.log("Empty password");
        } else if (this.password != this.confirmPassword) {
          console.log("Different passwords.");
        }
      }
      let emailOk = this.checkEmail();
      if (!emailOk) {
        console.log("Email not matching pattern");
      }
      let streetAddressAndSuburbOk = this.checkStreetAddressAndSuburb();
      if (!streetAddressAndSuburbOk) {
        console.log("Street Addres should not exceed 40 characters");
        console.log("Suburb should not exceed 20 characters");
      }

      let mobileNumberOk = this.checkMobileNumber();
      if (!mobileNumberOk) {
        console.log(
          "Phone number needs to have 10 digits and starts with '04' "
        );
      }

      let postCodeOk = this.checkPostCode();
      if (!postCodeOk) {
        console.log("Post code must have 4 digits");
      }

      let canSubmit =
        nameOk &&
        passwordsOk &&
        emailOk &&
        streetAddressAndSuburbOk &&
        mobileNumberOk &&
        postCodeOk;
      if (!canSubmit) {
        event.preventDefault();
      }
    },
  },
});

app.mount("#app");
