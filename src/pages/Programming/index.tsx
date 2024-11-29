// src/pages/Programming.tsx
import React from 'react';
import BlocklyComponent from './BlocklyComponent';

const Programming: React.FC = () => {
  const toolboxXml = `
  <xml xmlns="http://www.w3.org/1999/xhtml">
    <category name="Logic" colour="#5C81A6">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" colour="#5CA691">
      <block type="controls_flow_statements"></block> <!-- Break/Continue -->
    </category>
    <category name="Math" colour="#5CA65C">
      <block type="math_number">
        <field name="NUM">123</field>
      </block>
      <block type="math_arithmetic"></block>
      <block type="math_number"></block>
      <block type="math_arithmetic"></block>
    </category>
  </xml>
`;

  const workspaceConfig = {
    grid: {
      spacing: 25,
      length: 4,
      colour: '#e0e0e0',
      snap: true,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.2,
      maxScale: 4,
      minScale: 0.5,
    },
  };

  return (
    <div>
      <h1>Blockly Programming Demo</h1>
      <BlocklyComponent
        toolboxXml={toolboxXml}
        workspaceConfig={workspaceConfig}
        style={{ height: '600px', width: '100%', border: '1px solid #ccc' }}
        className="custom-blockly"
      />
    </div>
  );
};

export default Programming;
