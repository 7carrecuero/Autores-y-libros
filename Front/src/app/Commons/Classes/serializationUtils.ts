import { Dictionary } from './dictionary';
import * as moment from 'moment';

export function isString(obj: any) {
  return typeof obj === 'string';
}

export class SerializationUtils {

  /**
	 * reference to dateSentinelChar
	 */
  protected static dateSentinelChar = 9734;

  /**
	 * reference to dateSentinel
	 */
  protected static dateSentinel = String.fromCharCode(SerializationUtils.dateSentinelChar);

  /**
	 * reference to dateRegExp
	 */
  protected static dateRegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

  /**
	 * @method generateTypeScriptNameSpace
	 * generates the reverse path in angular for a namespace of the ui path
	 * @parameters {string} the namepace from the uip
	 * @returns {string} - The authentication token if an user is logged in, otherwise returns undefined
	 */
  static generateTypeScriptNameSpace(UIPEntityNamespace: string): string {
    UIPEntityNamespace = UIPEntityNamespace.split(',')[0];
    const indexLastDot = UIPEntityNamespace.lastIndexOf('.');
    const fileName = UIPEntityNamespace.substr(indexLastDot + 1, UIPEntityNamespace.length - 1);
    UIPEntityNamespace = UIPEntityNamespace.substr(0, indexLastDot);

    let result = '';
    let namespacePath = '';
    try {
      if (UIPEntityNamespace.indexOf('Entities') > -1) {
        if (UIPEntityNamespace.indexOf('Framework') > -1) {
          // If namespace contains Framework  example (Entities.Framework.Authorization) get (Autorization)
          namespacePath = UIPEntityNamespace.substr(UIPEntityNamespace.indexOf('Entities.') + 'Entities.'.length).replace('Framework.', '');

        } else {
          // if namespace not contains Framework  for example (Infocorp.UIProcess.Entities.Administration.Clients)
          // get (Administration\Clients)
          namespacePath = UIPEntityNamespace.substr(UIPEntityNamespace.indexOf('Entities.') + 'Entities.'.length);
          // Apendd UI to Module name

          const part1namespacePath: string = namespacePath.substr(0, namespacePath.indexOf('.'));
          const part2namespacePath: string = namespacePath.substr(namespacePath.indexOf('.'), namespacePath.length - 1);
          // alternativa insert!!!
          namespacePath = part1namespacePath + '.UI' + part2namespacePath;

        }
        namespacePath = namespacePath.concat('.Entities');
        namespacePath = namespacePath.replace('..', '.');
        namespacePath = namespacePath.replace('..', '.');

      } else {
        namespacePath = this.PathExceptions(UIPEntityNamespace);
      }
      result = namespacePath + '.' + fileName;
      return result;
    } catch (ex) {
      return null;
    }
  }

  static PathExceptions(entityNamespace: string): string {
    let namespacePath = '';
    if (entityNamespace.indexOf('Infocorp.Framework') > -1) {
      if (entityNamespace.indexOf('Enumerations') > -1) {
        namespacePath = entityNamespace.replace('Infocorp.Framework.', '').replace('Enumerations', 'Entities');
      } else {
        namespacePath = entityNamespace.replace('Infocorp.Framework.', '');
      }
    } else if (entityNamespace.indexOf('Infocorp.UIProcess.MethodParameters.Framework') > -1) {
      namespacePath = 'General.Classes';
    }

    return namespacePath;
  }

 /**
	 * @method serializeDatesAndEnums
	 * @param  {any} object
	 * @returns {any} returns object with dates and enums serialized
	 */
  static serializeDatesAndEnums(object: any): any {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (moment.isMoment(object[key])) {
          object[key] = this.serializeMoments(object[key], false);
        } else if (object[key] instanceof Date) {
          object[key] = this.serializeMoments(moment(object[key]), false);
        } else if (typeof object[key] === 'object') {
          if (object[key] && (object[key].isEnum)) {
            object[key] = this.serializeEnum(object[key]);
          } else {
            this.serializeDatesAndEnums(object[key]);
          }
        }
      }
    }
    return object;
  }

  /**
	 * @method deserializeDatesAndEnums
	 * @param  {any} object
	 * @returns {any} returns object with dates and enums deserialized
	 */
  static deserializeDatesAndEnums(object: any): any {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (this.isDate(object[key])) {
          object[key] = this.deserializeMoments(object[key]);
        } else if (typeof object[key] === 'object') {
          if (this.isEnum(object[key])) {
            object[key] = this.deserializeEnum(object[key]);
          } else {
            this.deserializeDatesAndEnums(object[key]);
          }
        }
      }
    }
    return object;
  }

  /**
	 * @method serializeDictionaries
	 * @param object
	 * @returns {any} returns object with dictionaries serialized
	 */
  static serializeDictionaries(object: any): any {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] && this.isDictionary(object[key], false)) {
          object[key] = this.serializeDictionary(object[key]);
        } else if (typeof object[key] === 'object') {
          this.serializeDictionaries(object[key]);
        }
      }
    }
    return object;
  }

  /**
	 * @method deserializeDictionaries
	 * @param  {any} object
	 * @returns {any} returns object with dictionaries deserialized
	 */
  static deserializeDictionaries(object: any): any {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] && this.isDictionary(object[key], true)) {
          object[key] = this.deserializeDictionary(object[key]);
        } else if (typeof object[key] === 'object') {
          this.deserializeDictionaries(object[key]);
        }
      }
    }
    return object;
  }

  /**
	 * @method deserializeExtendedPropertyValues
	 * @param  {any} object
	 * @returns {ExtendedPropertyValue}
	 */
  // static deserializeExtendedPropertyValues(object: any): any {
  // 	for (var key in object) {
  // 		if (object.hasOwnProperty(key)) {
  // 			if (object[key] && this.isExtendedPropertyValue(object[key])) {
  // 				object[key] = this.deserializeExtendedPropertyValue(object[key]);
  // 			} else if (typeof object[key] == 'object') {
  // 				this.deserializeExtendedPropertyValues(object[key]);
  // 			}
  // 		}
  // 	}
  // 	return object;
  // }

  /**
	 * @method serializeExtendedPropertyValues
	 * @param {any} object
	 * @returns {any} returns object with extended property values serialized
	 */
  static serializeExtendedPropertyValues(object: any): any {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        if (object[key] && this.isExtendedPropertyValue(object[key])) {
          object[key] = this.serializeExtendedPropertyValue(object[key]);
        } else if (typeof object[key] === 'object') {
          this.serializeExtendedPropertyValues(object[key]);
        }
      }
    }
    return object;
  }

  /**
	 * @method deserializeEnum
	 * @param  {string} attributeEnum
	 * @returns {ExtensibleEnum} returns an ExtensibleEnum
	 */
  static deserializeEnum(attributeEnum: any) {
    const enumValue = Number(attributeEnum['value']);

    // let attribute: string = (<string>attributeEnum['$type']);
    // attribute = attribute.replace('Extended,', ',');

    // let enumType = this.generateTypeScriptNameSpace(attribute);
    // let enumClass = createInstance(enumType);
    // let result = enumClass.constructor.getEnumByKey(enumValue);
    // TODO: Verificar resolve
    return attributeEnum;
  }

  /**
	 * @method serializeEnum
	 * @param  {any} object
	 * @returns {any} returns Enum's key
	 */
  static serializeEnum(object: any): any {
    if (object && (object.isEnum)) {
      return {
        'value': object['key'],
        'valueName': object['value'],
        '$type': object['$type']
      };
    } else {
      return object;
    }
  }

  /**
	 * @method serializeMoments
	 * @param  {any} object
	 * @param  {boolean} useSentinel
	 * @returns {any} returns ISOString
	 */
  static serializeMoments(object: any, useSentinel: boolean): any {
    if (moment.isMoment(object)) {
      object = (useSentinel ? SerializationUtils.dateSentinel : '') + object.format();
    } else {
      this.serializeMoments(object, useSentinel);
    }

    return object;
  }

  /**
	 * @method deserializeMoments
	 * @param  {string} object
	 * @returns {any} returns a Date
	 */
  static deserializeMoments(object: any): any {
    if (this.isDate(object)) {
      if (object.charCodeAt(0) === this.dateSentinelChar) {
        object = object.substring(1);
      }

      // '0001-01-01' identifies .NET's DateTime.MinValue which is returned by the web API for non-nullable dates with no value.
      if (object.startsWith('0001-01-01')) {
        return null;
      }

      return object.endsWith('Z') ? moment.utc(object, moment.ISO_8601) : moment(object, moment.ISO_8601);
    }

    return object;
  }

  /**
	 * @method deserializeDictionary
	 * @param  {any} dictionary object
	 * @returns {Dictionary} returns a Dictionary<any,any>
	 */
  static deserializeDictionary(dictionary: any): Dictionary<any, any> {
    const result: Dictionary<any, any> = new Dictionary<any, any>();

    for (const item of dictionary.data) {
      if (typeof item.key === 'object') {
        item.key = SerializationUtils.isDictionary(item.key, true)
          ? SerializationUtils.deserializeDictionary(item.key) : SerializationUtils.deserializeDictionaries(item.key);
      }
      if (typeof item.value === 'object') {
        item.value = SerializationUtils.isDictionary(item.value, true)
          ? SerializationUtils.deserializeDictionary(item.value) : SerializationUtils.deserializeDictionaries(item.value);
      }
      result.add(item.key, item.value);
    }

    return result;
  }

  /**
	 * @method deserializeExtendedPropertyValue
	 * @param  {ExtendedPropertyValue}
	 * @returns {object}
	 */
  // static deserializeExtendedPropertyValue(object: any): any {
  // 	let extendedPropertyValue: any = createInstance(this.generateTypeScriptNameSpace(object.$type));

  // 	extendedPropertyValue.type = object.type;
  // 	extendedPropertyValue.extendedPropertyValue = object.extendedPropertyValue;

  // 	return extendedPropertyValue;
  // }

  /**
	 * @method serializeDictionary
	 * @param dictionary object
	 * @returns {any} returns an object containing the given dictionary serialized
	 */
  static serializeDictionary(dictionary: Dictionary<any, any>): any {
    const result: any = { data: [] };

    for (const key of dictionary.keys()) {
      result.data.push({ key: key, value: dictionary.get(key) });
    }

    return result;
  }

  /**
	 * Serialize a extended property value
	 * @param extendedPropertyValue
	 * @returns {any}
	 */
  static serializeExtendedPropertyValue(extendedPropertyValue: any): any {
    return extendedPropertyValue.extendedPropertyValue;
  }

  /**
	 * @method isDate
	 * @param  {string} value
	 * @returns {boolean} returns true if object is a Date
	 */
  static isDate(value: string): boolean {
    // Check for '<' as an optimization to avoid checking if HTML partials are dates with the regular expression.
    return isString(value) && (value.charCodeAt(0) === this.dateSentinelChar || (!value.startsWith('<') && this.dateRegExp.test(value)));
  }

  /**
	 * @method isExtendedPropertyValue
	 * @param  {any} object to test
	 * @returns {boolean} returns true if object is an ExtendedPropertyValue
	 */
  static isExtendedPropertyValue(value: any): boolean {
    return value && value.$type && value.$type.indexOf('Infocorp.UIProcess.Entities.Framework.Common.ExtendedPropertyValue') > -1;
  }

  /**
	 * @method isEnum
	 * @param  {any} object
	 * @returns {boolean} returns true if object's type is enum
	 */
  static isEnum(object: any): boolean {
    return object && object['isEnum'];
  }

  /**
	 * @method isDictionary
	 * @param  {any} object
	 * @returns {boolean} returns true if object's type is dictionary
	 */
  static isDictionary(object: any, input: boolean): boolean {
    let result = false;

    if (object && object != null) {
      if ((input && object['isDictionary']) || (!input && object['isDictionary'] && object.hasOwnProperty('_keys'))) {
        result = true;
      }
    }
    return result;
  }

  /**
	 * @method queryStringSerializer
	 * @param  {any} obj
	 * @returns {string} returns the object serialized into a query string
	 */
  static queryStringSerializer(obj: any): string {
    obj = this.serializeDictionaries(obj);
    obj = this.serializeDatesAndEnums(obj);
    obj = this.serializeExtendedPropertyValues(obj);
    obj = this.param(obj);
    obj = obj.replace(/&?constructor\=undefined/i, '');
    return obj;
  }

  /**
	 * @method jsonStringSerializer
	 * @param  {any} obj
	 * @returns {string} returns the object serialized into a json string
	 */
  static jsonStringSerializer(obj: any): string {
    obj = this.serializeDictionaries(obj);
    obj = this.serializeDatesAndEnums(obj);
    obj = this.serializeExtendedPropertyValues(obj);

    return JSON.stringify(obj);
  }

  /**
	 * @method deserializeObjects
	 * Types the dates, enums, dictionaries and extended proty values in the given object
	 * @param {any} obj Response received from the WebAPI (without type any inner objects)
	 * @return {any} Response received from the WebAPI with innner dates, enums, dictionaries and extended property values typed
	 */
  static deserializeObjects(obj: any): any {
    obj = SerializationUtils.deserializeDatesAndEnums(obj);
    obj = SerializationUtils.deserializeDictionaries(obj);
    // obj = serializationUtils.deserializeExtendedPropertyValues(obj);
    return obj;
  }

  static param(a: any) {
    const s: string[] = [];
    const rbracket = /\[\]$/;
    let add: any;
    let buildParams: any;

    add = function (k: any, v: any) {
      v = typeof v === 'function' ? '' : v === null ? '' : v === undefined ? '' : v;
      // The framework now encodes correctly the queryString
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    }, buildParams = function (prefix: any, obj: any) {
      let i: any;
      let len: any;
      let key: any;
      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            if (rbracket.test(prefix)) {
              add(prefix, obj[i]);
            } else {
              buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']', obj[i]);
            }
          }
        } else if (obj && String(obj) === '[object Object]') {
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              buildParams(prefix + '[' + key + ']', obj[key]);
            }
          }
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value);
        }
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            buildParams(key, obj[key]);
          }
        }
      }
      return s;
    };
    return buildParams('', a).join('&').replace(/%20/g, '+');
  }
}
