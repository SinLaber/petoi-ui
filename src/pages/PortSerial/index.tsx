import React, { useState } from 'react';

const PortSerial: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [serialPort, setSerialPort] = useState<any>(null);
  const [reader, setReader] = useState<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const [writer, setWriter] = useState<WritableStreamDefaultWriter<Uint8Array> | null>(null);
  const [data, setData] = useState<string>('');
  const [command, setCommand] = useState<string>('');

  const readLoop = async (portReader: ReadableStreamDefaultReader<Uint8Array>) => {
    while (true) {
      try {
        const { value, done } = await portReader.read();
        if (done) {
          break;
        }
        if (value) {
          setData(prevData => prevData + new TextDecoder().decode(value));
        }
      } catch (error) {
        console.error('读取数据时出错:', error);
        break;
      }
    }
  };

  const connectToSerialPort = async () => {
    try {
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 115200 });

      const readableStream = port.readable;
      const portReader = readableStream?.getReader();
      const writableStream = port.writable;
      const portWriter = writableStream?.getWriter();

      if (portReader && portWriter) {
        setReader(portReader);
        setWriter(portWriter);
        setSerialPort(port);
        setIsConnected(true);
        console.log('已连接到串口');
        readLoop(portReader);
      }
    } catch (error) {
      console.error('打开串口时出错:', error);
    }
  };

  const disconnectSerialPort = async () => {
    if (reader) {
      await reader.cancel();
      reader.releaseLock();
      setReader(null);
    }
    if (writer) {
      await writer.close();
      setWriter(null);
    }
    if (serialPort && serialPort.readable) {
      await serialPort.close();
      setSerialPort(null);
      setIsConnected(false);
      console.log('串口已断开');
    }
  };

  const sendCommand = async () => {
    if (writer && command) {
      const data2 = new TextEncoder().encode(command + "\n"); // 加换行符作为结束
      await writer.write(data2);
      console.log('发送命令:', command);
      setCommand(''); // 清空输入框
    }
  };

  return (
      <div>
        <button onClick={isConnected ? disconnectSerialPort : connectToSerialPort}>
          {isConnected ? '断开连接' : '连接 COM3'}
        </button>
        <div>
          <h3>接收到的数据:</h3>
          <p>{data}</p>
        </div>
        {isConnected && (
            <div>
              <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="输入要发送的命令"
              />
              <button onClick={sendCommand}>发送命令</button>
            </div>
        )}
      </div>
  );
};

export default PortSerial;
