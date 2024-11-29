import React, { useEffect, useRef, useState } from 'react';
import Blockly from 'blockly/core';
import 'blockly/blocks'; // 默认积木
import 'blockly/javascript'; // JavaScript 生成器
import './BlocklyComponent.css'; // 自定义样式

interface BlocklyComponentProps {
  toolboxXml?: string; // 工具箱 XML
  workspaceConfig?: Blockly.BlocklyOptions; // 工作区配置
  style?: React.CSSProperties; // 自定义样式
  className?: string; // 自定义 CSS 类
}

const BlocklyComponent: React.FC<BlocklyComponentProps> = ({
                                                             toolboxXml,
                                                             workspaceConfig,
                                                             style,
                                                             className,
                                                           }) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);

  // 默认工具箱内容
  const defaultToolbox = `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <category name="Logic" colour="#5C81A6">
        <block type="controls_if"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>
      <category name="Loops" colour="#5CA699">
        <block type="controls_repeat_ext"></block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for"></block>
        <block type="controls_forEach"></block>
        <block type="controls_flow_statements"></block>
      </category>
      <category name="Math" colour="#5CA65C">
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="math_single"></block>
        <block type="math_trig"></block>
        <block type="math_constant"></block>
        <block type="math_number_property"></block>
        <block type="math_round"></block>
        <block type="math_on_list"></block>
        <block type="math_modulo"></block>
        <block type="math_constrain"></block>
        <block type="math_random_int"></block>
        <block type="math_random_float"></block>
      </category>
      <category name="Text" colour="#5CA68D">
        <block type="text"></block>
        <block type="text_join"></block>
        <block type="text_append"></block>
        <block type="text_length"></block>
        <block type="text_isEmpty"></block>
        <block type="text_indexOf"></block>
        <block type="text_charAt"></block>
        <block type="text_getSubstring"></block>
        <block type="text_changeCase"></block>
        <block type="text_trim"></block>
        <block type="text_print"></block>
        <block type="text_prompt_ext"></block>
      </category>
      <category name="Lists" colour="#745CA6">
        <block type="lists_create_empty"></block>
        <block type="lists_create_with"></block>
        <block type="lists_repeat"></block>
        <block type="lists_length"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_indexOf"></block>
        <block type="lists_getIndex"></block>
        <block type="lists_setIndex"></block>
        <block type="lists_getSublist"></block>
        <block type="lists_split"></block>
        <block type="lists_sort"></block>
      </category>
      <category name="Colour" colour="#A6745C">
        <block type="colour_picker"></block>
        <block type="colour_random"></block>
        <block type="colour_rgb"></block>
        <block type="colour_blend"></block>
      </category>
      <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
      <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>
    </xml>
  `;

  useEffect(() => {
    if (!blocklyDiv.current) return;

    // Blockly 配置
    const config: Blockly.BlocklyOptions = {
      toolbox: toolboxXml || defaultToolbox,
      grid: {
        spacing: 20,
        length: 3,
        colour: '#e0e0e0',
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
        pinch: true,
      },
      trashcan: true,
      collapse: true,
      // workspaceSearch: true,  // 启用工作区搜索插件
      ...workspaceConfig,
    };

    const newWorkspace = Blockly.inject(blocklyDiv.current, config);
    setWorkspace(newWorkspace);

    // 当 toolboxXml 更新时更新工作区工具箱
    if (toolboxXml) {
      newWorkspace.updateToolbox(toolboxXml);
    }

    return () => {
      newWorkspace.dispose();
    };
  }, [toolboxXml, workspaceConfig]);

  // 清空工作区
  const clearWorkspace = () => {
    if (workspace) workspace.clear();
  };

  return (
    <div className="blockly-container">
      {/* 工具栏 */}
      <div className="blockly-toolbar">
        <button onClick={clearWorkspace}>Clear Workspace</button>
      </div>

      {/* Blockly 工作区 */}
      <div
        ref={blocklyDiv}
        className={className || 'blockly-div'}
        style={style}
      ></div>
    </div>
  );
};

export default BlocklyComponent;
