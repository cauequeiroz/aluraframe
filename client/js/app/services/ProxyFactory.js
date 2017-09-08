class ProxyFactory {

    static create(obj, props, callback) {
        
        return new Proxy(obj, {
            get(target, prop, receiver) {

                if ( props.includes(prop) && ProxyFactory._isFunction(target[prop]) ) {
                    return function() {
                        let methodReturn = Reflect.apply(target[prop], target, arguments);
                        callback(target);
                        return methodReturn;
                    }
                }
                
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                
                let methodReturn = Reflect.set(target, prop, value, receiver);

                if ( props.includes(prop) ) {
                    callback(target);
                }
                    
                return methodReturn;
            }
        });
    }

    static _isFunction(func) {

        return typeof(func) == typeof(Function);
    }
}