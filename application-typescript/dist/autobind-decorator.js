// autobind decorator
export function autobind(target, methodName, desriptor) {
    const originalMethod = desriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind-decorator.js.map