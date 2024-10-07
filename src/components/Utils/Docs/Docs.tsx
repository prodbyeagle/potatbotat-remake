import React, { useEffect, useState } from 'react';
import yaml from 'yaml';
import { ApiDoc } from '../../../types/Docs';
import DocsLoader from './DocsLoader';
import Tooltip from '../../Tooltip';

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
   const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

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

   const copyToClipboard = async (fullUrl: string) => {
      try {
         await navigator.clipboard.writeText(fullUrl);
         setCopiedUrl(fullUrl);
         setTimeout(() => setCopiedUrl(null), 2000);
      } catch (err) {
         console.error('Failed to copy!', err);
      }
   };

   if (loading) {
      return <DocsLoader />;
   }

   if (error) {
      return <p className="text-red-500">{error}</p>;
   }

   const serverUrl = apiData?.servers?.[0]?.url || 'No server URL available';

   return (
      <div className="flex flex-col items-center justify-center border border-neutral-600 h-full bg-neutral-900/50 backdrop-blur-md relative overflow-hidden rounded-xl p-6 sm:p-12 duration-1000 transition">
         <div className="bg-neutral-800/50 border border-neutral-600 rounded-xl p-6 sm:p-10 shadow-lg flex flex-col items-center w-full max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-white text-center">{apiData?.info.title}</h1>
            <p className="text-base sm:text-lg text-gray-300 text-center mb-4">{apiData?.info.description}</p>
            <p className="text-xs sm:text-sm text-gray-400">Version: {apiData?.info.version}</p>
            <p className="text-xs sm:text-sm text-gray-400">Server URL: {serverUrl}</p>

            <h2 className="text-2xl sm:text-4xl text-white font-semibold mt-6 mb-4">API Endpoints</h2>
            <div className="w-full">
               {apiData && Object.keys(apiData.paths).map((path, index) => (
                  <div key={index} className="mb-6 p-4 bg-neutral-700 rounded-xl">
                     <Tooltip position='top' content='Click to copy URL!'>
                        <h3
                           className="text-lg sm:text-xl text-yellow-300 hover:border-green-400 border border-neutral-700 rounded-md p-1 font-semibold cursor-pointer duration-100 transition"
                           onClick={() => copyToClipboard(`${serverUrl}${path}`)}
                        >
                           <span className="text-neutral-500">{serverUrl}</span>{path}
                           {copiedUrl === `${serverUrl}${path}` && (
                              <div className="mt-2 text-green-500">
                                 URL copied!
                              </div>
                           )}
                        </h3>
                     </Tooltip>

                     {Object.keys(apiData.paths[path]).map((method, idx) => (
                        <div key={idx} className="mt-2 border-t border-neutral-600 pt-2">
                           <span className={`text-sm sm:text-base font-bold uppercase ${methodColors[method] || 'text-gray-400'}`}>
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
                                    <div key={idx} className="flex items-start text-gray-300">
                                       <strong className={`${statusColors[status] || 'text-gray-400'} font-medium`}>
                                          {status}:
                                       </strong>
                                       <span className="ml-2 text-gray-400">
                                          {apiData.paths[path][method].responses[status]?.description || 'No description provided'}
                                       </span>
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
