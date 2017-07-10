class ArticleActionsCtrl {
    constructor(User, Articles, $state) {
        'ngInject';

        this._User = User;
        this._$state = $state;
        this._Articles = Articles;
    }

    $onInit() {
        if(this._User.current) {
            this.canModify = (this._User.current.username === this.article.author.username);
        } else {
            this.canModify = false;
        }
    }

    deleteArticle() {
        this.isDeleting = true;
        this._Articles.destroy(this.article.slug).then(
            (success) => this._$state.go('app.home'),
            (err) => this._$state.go('app.home')
        );
    }
}

let ArticleActions = {
    bindings: {
        article: '='
    },
    transclude: true,
    controller: ArticleActionsCtrl,
    templateUrl: 'article/article-actions.html'
}

export default ArticleActions;