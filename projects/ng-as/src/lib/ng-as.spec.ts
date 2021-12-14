
import { NgAsModule } from './ng-as.module';
import { NgAsPipe } from './ng-as.pipe';

interface Test {
    x: boolean;
}

describe('NgAsPipe', () => {
    it('transform', () => {
        let Test!: Test;
        const pipe = new NgAsPipe();
        expect(pipe.transform({x: true}, Test)).toEqual({x: true});
    });
});

describe('NgAsModule', () => {
    it('should create NgAsModule', () => {
        expect(new NgAsModule()).toBeTruthy();
    });
});
