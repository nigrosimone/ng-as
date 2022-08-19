
import { NgAsModule } from './ng-as.module';
import { NgAsPipe } from './ng-as.pipe';
import { ngAs } from './ng-as.utils';

interface Test {
    x: boolean;
}

describe('NgAsPipe', () => {
    it('transform', () => {
        let Test!: Test;
        const pipe = new NgAsPipe();
        expect(pipe.transform({x: true}, Test)).toEqual({x: true});
        expect(ngAs({x: true}, Test)).toEqual({x: true});
    });
});

describe('NgAsModule', () => {
    it('should create NgAsModule', () => {
        expect(new NgAsModule()).toBeTruthy();
    });
});
