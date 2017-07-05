function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.editor', {
    url: '/editor/:slug',
    controller: 'EditorCtrl as $ctrl',
    templateUrl: 'editor/editor.html',
    title: 'Editor',
    resolve: {
      auth: (User) => {
        User.ensureAuthIs(true);
      },
      article: (Articles, User, $state, $stateParams) => {
        // If we're trying to edit an article
        if($stateParams.slug) {
          return Articles.get($stateParams.slug).then(
            (article) => {
              // If the current user is the author, resolve the article data
              if(User.current.username === article.author.username) {
                return article;
              // Otherwise, redirect them to home page
              } else {
                $state.go('app.home');
              }
            },
            // If there's an error (article doesn't exist, etc), redirect to home page
            (err) => {
              $state.go('app.home');
            }
          )
        } else {
          return null;
        }
      }
    }
  })

};

export default EditorConfig;