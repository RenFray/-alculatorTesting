import Singleton from '../utils/Singleton';

describe('Singleton Pattern', () => {
    test('should create only one instance', () => {
        const instance1 = Singleton.getInstance();
        const instance2 = Singleton.getInstance();

        expect(instance1).toBe(instance2);
    });

    test('should execute method from Singleton instance', () => {
        const instance = Singleton.getInstance();
        instance.someMethod(); // Output: Hello from Singleton
    });
});
