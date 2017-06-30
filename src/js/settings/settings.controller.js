class SettingsCtrl {
    constructor(User) {
        'ngInject';

        this._User = User;

        this.formData = {
            email: User.current.email,
            bio: User.current.bio,
            image: User.current.image,
            username: User.current.username
        }

        this.logout = User.logout.bind(User);
    }

    submitForm() {
        this.isSubmitting = true;
        this._User.update(this.formData).then(
            (user) => {
                console.log("success!");
                this.isSubmitting = false;
            },
            (err) => {
                this.isSubmitting = false;
                this.errors = err.data.errors;
            }
        );
    }
}

export default SettingsCtrl;