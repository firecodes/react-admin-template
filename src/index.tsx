import ReactDOM from 'react-dom/client';
import App from './App';
// 相对定位react-grid-layout 库的css样式
import '../node_modules/react-grid-layout/css/styles.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
