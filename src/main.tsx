import { hydrateRoot, createRoot } from 'react-dom/client';
import { App } from './App';
import '@fontsource-variable/manrope';
import '@fontsource/noto-sans-telugu/400.css';
import '@fontsource/noto-sans-telugu/600.css';
import './styles.css';
import './media.css';
import './desktop.css';
import './catalogue.css';
import './readability.css';
import './document-guide.css';
import './king-chat.css';
const root = document.getElementById('root')!;
const initial = document.getElementById('initial-site-data')?.textContent;
const props = initial ? JSON.parse(initial) : {};
const app = <App path={window.location.pathname} {...props}/>;
// The preview and production host must serve each route's own HTML snapshot.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => { }); });
}
