import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// import { App } from './app';
import 'src/app/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div>111111111111</div>
    </BrowserRouter>
  </StrictMode>,
);