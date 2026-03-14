import "./sample.css";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Biome CSS Logical Property Plugin Demo</h1>
        <p>
          This app demonstrates the biome-plugin-css-prefer-logical-property plugin.
          Check <code>src/app/sample.css</code> for examples of physical CSS properties
          that the plugin detects.
        </p>
        <div className="sidebar">Sidebar</div>
        <p className="text">Sample text</p>
        <div className="float-box">Float box</div>
      </div>
    </main>
  );
}
