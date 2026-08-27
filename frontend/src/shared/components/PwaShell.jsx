import '../../shared/styles/pwa.css';
export default function PwaShell({ children, tabbar = null, modalRoot = null, toast = null }) {
  return <div className="pwa-shell"><main className="pwa-content">{children}</main>{tabbar}<div className="pwa-modal-root">{modalRoot}</div><div className="pwa-toast">{toast}</div></div>;
}
export { PwaShell };
