import { Container, Register } from "./Container";

interface IDepA {
    doA(): void;
}

interface IDepB {
    doB(): void;
}

interface IDepC {
    doC(): void;
}

@Register('IDepA', [])
class ConcreteA implements IDepA {
    doA(): void {
        console.log('doing task A');
    }
}

@Register('IDepB', [])
class ConcreteB implements IDepB {
    doB(): void {
        console.log('doing task B');
    }
}

@Register('IDepC', ['IDepA', 'IDepB'])
class ConcreteC implements IDepC {
    constructor(private _depA: IDepA, private _depB: IDepB) {

    }

    doC(): void {
        this._depA.doA();
        this._depB.doB();
    }
}

var container = Container.instance;

var c = container.resolve<IDepC>('IDepC');
c.doC();