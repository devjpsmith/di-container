export class Container {
    private static _instance: Container = new Container();
    
    private _dependencies: { [key: string]: Object} = {};

    private constructor() {
        if (Container._instance) {
            throw new Error('Cannot use new to create a Container');
        }
    }

    public static get instance(): Container {
        return Container._instance;
    }

    register(name: string, dependencies: string[], implementation: any) {
        if (this._dependencies[name]) {
            throw new Error('Dependency has already been registered');
        }
        let dependenciesImplementations = this.getDependenciesImplementaions(dependencies);
        this._dependencies[name] = new implementation(...dependenciesImplementations);
    }

    resolve<T>(name: string): T {
        if (!this._dependencies[name]) {
            throw new Error(`Dependency ${name} is not registered`);
        }
        return this._dependencies[name] as T;
    }

    private getDependenciesImplementaions(names: string[]): Object[] {
        return names.map(name => this.resolve(name));
    }
}

export function Register(name: string, dependencies: string[]): Function {
    let container = Container.instance;
    return function<T extends {new (...args: any[]): {}}>(constructor: T) {
        container.register(name, dependencies, constructor);
    }
}