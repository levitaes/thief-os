export default {
    name: 'neofetch',
    description: 'neofetch',
    execute(os, args) {
    const data = {
        os: "thiefOS",
        host: navigator.platform,
        kernel: "thiefOS",
        packages: os.functions.size,
        shell: "thiefOS",
        resolution: `${window.innerWidth}x${window.innerHeight}`,
        cpu: navigator.hardwareConcurrency,
    }

    // Memory
    try {
        data.memory = navigator.deviceMemory ?? "unknown";
    }
    catch (error) {
        data.memory = "unknown";
    }

    // GPU
    const canvas = document.createElement("canvas");
    let gl;
    try{
        gl = canvas.getContext('webgl', { powerPreference: "high-performance" }) || canvas.getContext('experimental-webgl', { powerPreference: "high-performance" });
    }
    catch (error) {}
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        data.gpu = `${vendor}`;
    }

    // Display data
    let string = "";
    for (const [key, value] of Object.entries(data)) {
        os.say(`${key}: ${value}`);
    }

    os.next(string);
    }
};
