interface specification {
  accepts: function(obj: object, noThrowException: boolean): boolean
}
interface TypeDescriptor {
  description: string,
  accepts:     function(value: any): boolean
}

export type Enumeration   = function(permissableValues: string[]): TypeDescriptor;
export type Boolean       = function(): TypeDescriptor;
export type isFinite      = function(val: any): boolean;
export type Number        = function(): TypeDescriptor;
export type Array         = function(): TypeDescriptor;
export type ArrayOfSpec   = function(subSpecification:TypeDescriptor): TypeDescriptor;
export type Object        = function(): TypeDescriptor;
export type ObjectOfSpec  = function(subSpecification:TypeDescriptor): TypeDescriptor;
export type String        = function(): TypeDescriptor;
export type Specification = function(properties: object): specification;
