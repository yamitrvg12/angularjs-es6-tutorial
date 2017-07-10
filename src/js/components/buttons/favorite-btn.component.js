class FavoriteBtnController {
    constructor(User, $state, Articles) {
        'ngInject';

        this._User = User;
        this._$state = $state;
        this._Articles = Articles;
    }

    submit() {
        this.isSubmitting = true;
        
        if(!this._User.current) {
            this._$state.go('app.register');
            return;
        }

        if(this.article.favorited) {
            this._Articles.unFavorite(this.article.slug).then(
                () => {
                    this.isSubmitting = false;
                    this.article.favorited = false;
                    this.article.favoritesCount--;
                }
            )
        } else {
            this._Articles.favorite(this.article.slug).then(
                () => {
                    this.isSubmitting = false;
                    this.article.favorited = true;
                    this.article.favoritesCount++;
                }
            )
        }
    }
}

let FavoriteBtn = {
    bindings: {
        article: '='
    },
    controller: FavoriteBtnController,
    transclude: true,
    templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;