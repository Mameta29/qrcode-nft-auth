// hooks/useDynamicImport.js
// import { useState, useEffect } from 'react';

// const useDynamicImport = (modulePath) => {
//   const [Component, setComponent] = useState(null);

//   useEffect(() => {
//     const importModule = async () => {
//       const importedModule = await import(modulePath);
//       setComponent(() => importedModule.default);
//     };

//     importModule();
//   }, [modulePath]);

//   return Component;
// };

// export default useDynamicImport;
