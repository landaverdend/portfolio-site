import './cover-letter-generator-view.css';

export default function CoverLetterGeneratorView() {
  return (
    <div className="generator-container">
      <div className="form-controls">
        <form>
          <label>
            <b>Your Title/Name:</b>
            <input type="text"></input>
          </label>
          <label>
            <b>Your Company/Business</b>
            <input type="text"></input>
          </label>
        </form>
      </div>
      <div className="letter-container">RIGHT SIDE...</div>
    </div>
  );
}
