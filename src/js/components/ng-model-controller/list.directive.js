function List() {
    'ngInject';

    return {
        template: '<div>Hora: {{ hora | date:\'h:mm:ss a\' }}</div> - <div>Time: {{$ctrl.time | currency }}</div>',
        restrict: 'E',
        transclude: true,
        require: '?ngModel',
        link: (scope, element, attrs, ngModel)=> {
            scope.hora = new Date();
            
            element.on("click", ()=> {
                ngModel.$setViewValue(ngModel.$viewValue + 10);
            });


            // debugger;
        }
    }
}

export default List;