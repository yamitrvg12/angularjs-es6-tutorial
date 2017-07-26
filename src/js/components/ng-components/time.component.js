class TimeController {
    constructor() {
        '@ngInject';

        this.time = 10;
    }
}

let Time = {
    controller: TimeController,
    templateUrl: 'components/ng-components/time.html'
};

export default Time;