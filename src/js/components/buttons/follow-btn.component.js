class FollowBtnController {
    constructor(User, $state, Profile) {
        'ngInject';

        this._User = User;
        this._$state = $state;
        this._Profile = Profile;
    }

    onSubmit() {
        this.isSubmitting = true;

        if(!this._User.current) {
            this._$state.go('app.register');
            return;
        }

        // If following already, unfollow
        if(this.user.following) {
            this._Profile.unfollow(this.user.username).then(
                () => {
                    this.isSubmitting = false;
                    this.user.following = false;
                }
            )
        } else {
            // Follow
            this._Profile.follow(this.user.username).then(
                () => {
                    this.isSubmitting = false;
                    this.user.following = true;
                }
            )
        }
    }
}

let FollowBtn = {
    bindings: {
        user: '='
    },
    controller: FollowBtnController,
    templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;