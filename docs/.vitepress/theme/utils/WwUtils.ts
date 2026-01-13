// utils/isEmpty.js

/**
 * 检查值是否为空（支持多种类型）
 * @param {any} value - 待检查的值
 * @returns {boolean} - 如果值为空返回 true，否则返回 false
 */
export function isEmpty(value: any) {
    // 处理 null 和 undefined
    if (value === null || value === undefined) {
        return true;
    }

    // 处理字符串（包括纯空格字符串）
    if (typeof value === 'string') {
        return value.trim().length === 0;
    }

    // 处理数组
    if (Array.isArray(value)) {
        return value.length === 0;
    }

    // 处理对象
    if (typeof value === 'object') {
        // 特殊处理 Date 对象
        if (value instanceof Date) {
            return false;
        }

        // 处理 Set 和 Map
        if (value instanceof Set || value instanceof Map) {
            return value.size === 0;
        }

        // 处理普通对象和类对象
        return Object.keys(value).length === 0;
    }

    // 其他情况（数字、布尔值、函数等）
    return false;
}

export function isNotEmpty(value: any) {
    return !isEmpty(value)
}

// 生成全局变量辅助方法
export function generateEnvDefines(config = {}, prefix = '') {
    console.log('generateEnvDefines - config', config)
    const defines = {};
    for (const [key, value] of Object.entries(config)) {
        const defineKey = `import.meta.env.${prefix}${key.toUpperCase()}`;
        defines[defineKey] = JSON.stringify(value);
    }
    return defines;
}

export async function getLocationInfo(){
    try {
        const response = await fetch('https://api.vvhan.com/api/ipInfo');
        const data = await response.json();
        if (data.success) {
            const info = data.info;
            return `${info.country}-${info.prov}-${info.city}-${info.isp}`;
        }
    } catch (err) {
        console.error('获取ip信息失败', err);
    }
}

export function myConsoleInfo(isRandom: boolean = false, ...params: string[]) {
    if (params.length === 0) return;
    console.log("myConsoleInfo - params", params)

    // 定义更多颜色选项（包括深浅对比和彩虹色系）
    const colors = [
        // 深色背景（适合白色文字）
        '#030307', '#1a1a2e', '#16213e', '#0f3460', '#1a365d', '#2d3748',
        '#4a5568', '#718096', '#2a4365', '#2c5282', '#2b6cb0', '#3182ce',
        '#38b2ac', '#319795', '#48bb78', '#68d391', '#805ad5', '#9f7aea',

        // 浅色背景（适合深色文字）
        '#fadfa3', '#fefcbf', '#faf089', '#f6e05e', '#ecc94b', '#d69e2e',
        '#ed8936', '#dd6b20', '#ed64a6', '#d53f8c', '#b7791f', '#b7410e',
        '#e94560', '#ff9800', '#4caf50', '#2196f3'
    ];

    // 基础文字样式
    const baseTextStyle = 'padding: 5px 0px;';

    // 构建格式化字符串和样式数组
    let formatString = '\n';
    const styles: string[] = [];
    let lastColorIndex = -1; // 记录上一个颜色索引，避免重复

    params.forEach((param, index) => {
        let colorIndex: number;

        param = String(param)
        let color
        // 如果是url则使用固定的颜色
        if (param.startsWith("http:") || param.startsWith("https:")){
            color = '#fadfa3'
        }else {
            // 随机颜色模式（确保不与前一个重复）
            if (isRandom) {
                if (colors.length > 1) {
                    do {
                        colorIndex = Math.floor(Math.random() * colors.length);
                    } while (colorIndex === lastColorIndex);
                    lastColorIndex = colorIndex;
                } else {
                    colorIndex = 0; // 只有一种颜色时直接使用
                }
            }
            // 顺序颜色模式（循环使用颜色数组）
            else {
                colorIndex = index % colors.length;
            }
            color = colors[colorIndex];
        }

        const isDarkColor = /^#[0-6]/i.test(color); // 简单判断深色（以0-6开头的十六进制颜色）

        // 根据背景色深浅自动调整文字颜色
        const textColor = isDarkColor ? '#fff' : '#000';

        // 添加参数占位符和对应的样式
        formatString += `%c ${param} `;
        styles.push(`${baseTextStyle} background: ${color}; color: ${textColor};`);
    });

    formatString += '\n'; // 结尾换行

    // 输出带样式的日志
    console.info(formatString, ...styles);
}
