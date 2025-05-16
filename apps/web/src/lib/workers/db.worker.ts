/// <reference lib="webworker" />

self.onmessage = async (e) => {
  console.log(`${e.data} to worker`);

  self.postMessage("Hello from web worker");
};

export default null as any;
