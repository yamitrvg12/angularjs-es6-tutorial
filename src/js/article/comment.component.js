class CommentCtrl {
  constructor(User) {
    'ngInject';

    this._User = User;
  }

  $onInit() {
    // The user can only delete this comment if they are the author
    if(this._User.current) {
      this.canModify = (this._User.current.username === this.data.author.username);
    } else {
      this.canModify = false;
    }
  }
}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&',
  },
  controller: CommentCtrl,
  templateUrl: 'article/comment.html'
};

export default Comment;