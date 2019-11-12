import { barReducer, qux, baz } from '../fooReducer';

describe('barReducer', () => {
    it('should return a default state', () => {
        expect(barReducer(undefined, {} as any)).toBe(0);
    });

    it("should set the state to BAZ action's payload", () => {
        expect(barReducer(7, baz(99))).toBe(99);
    });

    it("should keep the current state if the BAZ action's payload is not a number", () => {
        expect(barReducer(7, baz('abc' as any))).toBe(7);
    });

    it('should increment on QUX actions', () => {
        expect(barReducer(undefined, qux())).toBe(1);
        expect(barReducer(1, qux())).toBe(2);
        expect(barReducer(11, qux())).toBe(12);
        expect(barReducer(11, qux())).toBe(12);
    });
});
