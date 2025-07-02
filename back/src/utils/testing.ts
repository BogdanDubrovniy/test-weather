import { Container, ContainerInstance } from 'typedi';

/* istanbul ignore next */
export class TestingModule {
    private container: ContainerInstance;

    constructor() {
        this.container = Container.of();
    }

    get<T>(service: new (...args: any[]) => T): T {
        return this.container.get(service);
    }

    mock<T>(token: any, mock: T): this {
        this.container.set(token, mock);
        return this;
    }

    reset() {
        this.container.reset();
    }
}

export function createTestingModule() {
    return new TestingModule();
}
