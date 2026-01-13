// 星星定位 - 全局星星
import { reactive, ref } from "vue";

type StarStyle = {
    left?: string;
    top?: string;
    transform?: string;
    opacity?: string;
    ["--offset-x"]?: string;
    ["--offset-y"]?: string;
};

export function useStarBurst() {
    const gStarStyle = reactive<StarStyle[]>(
        Array.from({ length: 6 }, () => ({
            left: "0px",
            top: "0px",
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0",
            "--offset-x": "0px",
            "--offset-y": "0px",
        }))
    );

    const starsWrap = ref<HTMLElement>();

    function setWrap(el: HTMLElement) {
        starsWrap.value = el;
    }

    function onAvatarEnter(e: MouseEvent) {
        if (!starsWrap.value) return;

        const bannerRect = starsWrap.value.getBoundingClientRect();
        const iconRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const centerX = iconRect.left + iconRect.width / 2 - bannerRect.left;
        const centerY = iconRect.top + iconRect.height / 2 - bannerRect.top;

        starsWrap.value.classList.add("show");

        // 固定偏移，美观齐爆
        const offsets = [
            { x: -42, y: -60 },
            { x: 42, y: -60 },
            { x: -72, y: 0 },
            { x: 72, y: 0 },
            { x: -50, y: 55 },
            { x: 50, y: 55 },
        ];

        for (let i = 0; i < 6; i++) {
            gStarStyle[i] = {
                left: `${centerX}px`,
                top: `${centerY}px`,
                "--offset-x": `${offsets[i].x}px`,
                "--offset-y": `${offsets[i].y}px`,
                transform: "translate(-50%, -50%) scale(0)",
                opacity: "0",
            };
        }

        // 使用setTimeout强制触发浏览器重新渲染，确保动画正确启动
        setTimeout(() => {
            // 这里不需要做任何事，setTimeout本身会触发一次渲染周期
        }, 0);
    }

    function onAvatarLeave() {
        if (!starsWrap.value) return;
        starsWrap.value.classList.remove("show");
        gStarStyle.forEach((_, i) => {
            gStarStyle[i] = {
                transform: "translate(-50%, -50%) scale(0)",
                opacity: "0",
                "--offset-x": "0px",
                "--offset-y": "0px",
            };
        });
    }

    return { gStarStyle, setWrap, onAvatarEnter, onAvatarLeave };
}