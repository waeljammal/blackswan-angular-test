/// <reference path="../../../../typings/_custom.d.ts" />

export * from './log';
export * from './inject';
export * from './directive';
export * from './controller';
export * from './service';
export * from './autobind';

//import {log} from './log';
//import {inject as Inject} from './inject';
//import {directive} from './directive';
//import {controller} from './controller';
//import {service} from './service';
//import {autobind} from './autobind';

//export function makeParamDecorator(annotationCls): any {
//    function ParamDecoratorFactory(...args): any {
//        var annotationInstance = Object.create(annotationCls.prototype);
//        annotationCls.apply(annotationInstance, args);
//        if (this instanceof annotationCls) {
//            return annotationInstance;
//        } else {
//            (<any>ParamDecorator).annotation = annotationInstance;
//            return ParamDecorator;
//        }
//
//
//        function ParamDecorator(cls, unusedKey, index): any {
//            var parameters: Array<Array<any>> = Reflect.getMetadata('parameters', cls);
//            parameters = parameters || [];
//
//            // there might be gaps if some in between parameters do not have annotations.
//            // we pad with nulls.
//            while (parameters.length <= index) {
//                parameters.push(null);
//            }
//
//            parameters[index] = parameters[index] || [];
//            var annotationsForParam: Array<any> = parameters[index];
//            annotationsForParam.push(annotationInstance);
//
//            Reflect.defineMetadata('parameters', parameters, cls);
//            return cls;
//        }
//    }
//    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
//    return ParamDecoratorFactory;
//}

//export var inject =  makeParamDecorator(Inject);