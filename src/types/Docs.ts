export interface Server {
   url: string;
   description?: string;
}

export interface Schema {
   type: 'string' | 'number' | 'boolean' | 'array' | 'object';
   format?: string;
   items?: Schema; // For array types
   properties?: {
      [key: string]: Schema; // Nested objects
   };
}

export interface ResponseSchema {
   type: string;
   properties?: {
      [key: string]: {
         type: string;
         example?: unknown;
      };
   };
   example?: unknown;
}

export interface Response {
   description: string;
   content?: {
      [mediaType: string]: {
         schema: ResponseSchema;
      };
   };
}

export interface ApiDoc {
   info: {
      title: string;
      description?: string;
      version: string;
   };
   servers: Server[];
   paths: {
      [key: string]: {
         [method: string]: {
            summary?: string;
            tags?: string[];
            description?: string;
            responses: {
               [status: string]: Response;
            };
         };
      };
   };
}
