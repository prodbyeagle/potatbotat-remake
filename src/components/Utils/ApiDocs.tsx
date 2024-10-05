import React, { useEffect, useState } from 'react';
import yaml from 'yaml';
import { ApiDoc } from '../../types/Docs';

const methodColors: Record<string, string> = {
   get: 'text-green-400',
   post: 'text-blue-400',
   put: 'text-yellow-400',
   delete: 'text-red-400',
   patch: 'text-purple-400',
};

const statusColors: Record<string, string> = {
   '200': 'text-green-500',
   '201': 'text-blue-500',
   '204': 'text-green-300',
   '400': 'text-yellow-500',
   '404': 'text-red-500',
   '429': 'text-orange-500',
   '500': 'text-red-600',
};

const ApiDocs: React.FC = () => {
   const [apiData, setApiData] = useState<ApiDoc | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchSwaggerData = async () => {
         try {
            const response = await fetch('https://i.potat.app/swagger.yaml');
            const yamlText = await response.text();
            const parsedData = yaml.parse(yamlText) as ApiDoc;
            setApiData(parsedData);
         } catch (err) {
            setError('Failed to load API documentation.');
         } finally {
            setLoading(false);
         }
      };

      fetchSwaggerData();
   }, []);

   if (loading) {
      return <p className="text-lg text-white">Loading API Documentation...</p>;
   }

   if (error) {
      return <p className="text-red-500">{error}</p>;
   }

   const serverUrl = apiData?.servers?.[0]?.url || 'No server URL available';

   return (
      <div className="flex flex-col items-center justify-center border border-neutral-600 h-full bg-neutral-900/50 backdrop-blur-md relative overflow-hidden rounded-xl p-6 sm:p-12">
         <div className="bg-neutral-800/50 border border-neutral-600 rounded-xl p-6 sm:p-10 shadow-lg flex flex-col items-center w-full max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 text-white text-center">{apiData?.info.title}</h1>
            <p className="text-lg text-gray-300 text-center mb-4">{apiData?.info.description}</p>
            <p className="text-sm text-gray-400">Version: {apiData?.info.version}</p>
            <p className="text-sm text-gray-400">Server URL: {serverUrl}</p>

            <h2 className="text-4xl text-white font-semibold mt-6 mb-4">API Endpoints</h2>
            <div className="w-full">
               {apiData && Object.keys(apiData.paths).map((path, index) => (
                  <div key={index} className="mb-6 p-4 bg-neutral-700 rounded-xl">
                     <h3 className="text-xl text-yellow-300 font-semibold">
                        <span className="text-neutral-500">{serverUrl}</span>{path}
                     </h3>

                     {Object.keys(apiData.paths[path]).map((method, idx) => (
                        <div key={idx} className="mt-2 border-t border-neutral-600 pt-2">
                           <span className={`text-sm font-bold uppercase ${methodColors[method] || 'text-gray-400'}`}>
                              {method.toUpperCase()}
                           </span>
                           <p className="text-white mt-1">
                              {apiData.paths[path][method]?.summary || 'No summary provided'}
                           </p>

                           <p className="text-gray-300 mt-2">
                              <strong>Description:</strong> {apiData.paths[path][method]?.description || 'No description provided'}
                           </p>

                           {apiData.paths[path][method]?.responses && (
                              <div className="mt-2">
                                 {Object.keys(apiData.paths[path][method].responses).map((status, idx) => (
                                    <div key={idx} className={`flex items-start text-gray-300`}>
                                       <strong className={`${statusColors[status] || 'text-gray-400'} font-medium`}>
                                          {status}:
                                       </strong>
                                       <span className="ml-2 text-gray-400">
                                          {apiData.paths[path][method].responses[status]?.description || 'No description provided'}
                                       </span>
                                       {apiData.paths[path][method].responses[status]?.content && (
                                          <div className="mt-2 p-4 bg-gray-900 rounded-lg shadow-md">
                                             <strong className="text-gray-300">Example Response:</strong>
                                             <pre className="bg-gray-800 text-gray-200 p-2 rounded-md overflow-x-auto">
                                                {JSON.stringify(apiData.paths[path][method].responses[status].content, null, 2)}
                                             </pre>
                                          </div>
                                       )}
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default ApiDocs;
