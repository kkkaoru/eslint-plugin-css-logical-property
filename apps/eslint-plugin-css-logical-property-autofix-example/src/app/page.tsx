import "./sample.css";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>CSS Logical Property Plugin Demo</h1>
        <p>
          This app demonstrates{" "}
          <code>eslint-plugin-css-logical-property-autofix</code> in action.
        </p>
        <p>
          Check <code>src/app/sample.css</code> for physical CSS properties that
          the plugin will flag and auto-fix.
        </p>
      </div>
      <aside className="sidebar">
        <p>Sidebar content</p>
      </aside>
      <div className="text">
        <p>Text aligned with physical property</p>
      </div>
      <div className="float-box">
        <p>Float box</p>
      </div>
    </main>
  );
}
