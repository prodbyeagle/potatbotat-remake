export interface ExtendedOptions extends RequestInit {
   params?: Record<string, any>;
   auth?: boolean;
}

export type ParsedRes<T> = {
   statusCode: number;
} & T

export type GenericResponse<T> = {
   data: T[];
   duration: number;
   statusCode: number;
   pagination?: { cursor: string; hasNextPage: boolean; };
   errors?: { message: string; }[]
}