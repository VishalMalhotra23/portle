import "./App.css";
import TextEditor from "./component/TextEditor";

const App = () => {
  const handleSave = () => {
    console.log("Content saved!");
  };

  return (
    <div className="main">
      <div className="header">Editor By Vishal Malhotra</div>

      <div className="hero">
        <TextEditor onSave={handleSave} />
      </div>
    </div>
  );
};

export default App;
