import assert from "assert";
import {Methods} from "../src/calc";


describe('Methods', () => {
    let methods: Methods;

    beforeEach(() => {
        methods = new Methods();
    });

    it('должен вернуть 5 для рассчёта (2, "+", 3)', () => {
        assert.strictEqual(methods.calculate('2', '+', '3'), 5);
    });

    it('должен вернуть 4 для рассчёта (6, "-", 2)', () => {
        assert.strictEqual(methods.calculate('6', '-', '2'), 4);
    });

    it('должен вернуть 8 для рассчёта (4, "*", 2)', () => {
        assert.strictEqual(methods.calculate('4', '*', '2'), 8);
    });

    it('должен вернуть 8 для рассчёта (24, "/", 3)', () => {
        assert.strictEqual(methods.calculate('24', '/', '3'), 8);
    });

    it('должен вернуть 1 для рассчёта (10, "%", 3)', () => {
        assert.strictEqual(methods.calculate('10', '%', '3'), 1);
    });

    it('должен вернуть 25 для квадрата ("5")', () => {
        assert.strictEqual(methods.square('5'), 25);
    });

    it('должно выдать ошибку из-за недопустимой операции', () => {
        assert.throws(() => methods.calculate('5', '^', '3'), {
            message: 'Неверная операция: ^'
        });
    });

    it('должно выдавать ошибку при делении на ноль', () => {
        assert.throws(() => methods.calculate('5', '/', '0'), {
            message: 'Деление на ноль'
        });
    });
});

/*describe("First Test",()=>{
    const numberArray = [1,3,2,4,9,6,7,0]

    //before(()=>{

    //})

    it("correct work of asc sort",()=>{
        const actualResult = Methods.sortNumberArray(numberArray, "asc");
        const expectedResult = [0,1,2,3,4,6,7,8,9,5];

        expect(actualResult).to.be.equal(expectedResult);
        //assert.deepEqual(actualResult,expectedResult,notEqualMessage);
    });
});

/*describe("Test",()=> {
    test('test 1', () => {
        expect('string').not.toBe('string')
    })
})*/
