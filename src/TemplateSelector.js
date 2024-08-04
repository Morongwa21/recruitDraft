import React from 'react';

const TemplateSelector = ({ currentTemplate, onChangeTemplate }) => {
  const templates = ['Basic', 'Elegant'];

  return (
    <div className="template-selector">
      <label htmlFor="template-select">Choose a CV Template:</label>
      <select
        id="template-select"
        value={currentTemplate}
        onChange={(e) => onChangeTemplate(e.target.value)}
      >
        {templates.map((template) => (
          <option key={template} value={template}>
            {template}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TemplateSelector;
