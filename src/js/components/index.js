import angular from 'angular';
// Directives
import ShowAuthed from './show-authed.directive';
// Components
import ListErrors from './list-errors.component';
import FollowBtn from './buttons/follow-btn.component';
import ArticleMeta from './article-helpers/article-meta.component';
import FavoriteBtn from './buttons/favorite-btn.component';


let componentsModule = angular.module('app.components', []);

componentsModule.directive('showAuthed', ShowAuthed);
componentsModule.component('listErrors', ListErrors);
componentsModule.component('followBtn', FollowBtn);
componentsModule.component('favoriteBtn', FavoriteBtn);
componentsModule.component('articleMeta', ArticleMeta);


export default componentsModule;
