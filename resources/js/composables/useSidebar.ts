import { useEventListener, useMediaQuery } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref } from 'vue';

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const getInitialSidebarState = () => {
    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith(SIDEBAR_COOKIE_NAME));
    if (cookieValue) {
        const value = cookieValue.split('=')[1];
        return value === 'true';
    }
    return true; // Default to open if cookie is not set
};

const openMobile = ref(false);
const open = ref(getInitialSidebarState());

export const useSidebar = (isOpen?: boolean) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const closeMobile = () => {
        openMobile.value = false;
    };

    onMounted(() => {
        if (isOpen !== undefined) {
            if (isMobile.value) {
                setOpen(isOpen);
            } else {
                setOpenMobile(isOpen);
            }
        }

        // 1) intercept pushState/replaceState → dispatch custom event
        const origPush = history.pushState;
        const origReplace = history.replaceState;

        history.pushState = function (...args) {
            origPush.apply(this, args);
            window.dispatchEvent(new Event('locationchange'));
            return true;
        };
        history.replaceState = function (...args) {
            origReplace.apply(this, args);
            window.dispatchEvent(new Event('locationchange'));
            return true;
        };

        // 2) listen for all URL-change events
        window.addEventListener('popstate', closeMobile);
        window.addEventListener('hashchange', closeMobile);
        window.addEventListener('locationchange', closeMobile);
    });

    onUnmounted(() => {
        window.removeEventListener('popstate', closeMobile);
        window.removeEventListener('hashchange', closeMobile);
        window.removeEventListener('locationchange', closeMobile);
    });

    // …rest of your setOpen, toggleSidebar, state, keydown, etc.
    const setOpen = (v: boolean) => {
        open.value = v;
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${v}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    };
    const setOpenMobile = (v: boolean) => {
        openMobile.value = v;
    };
    const toggleSidebar = () => {
        if (isMobile.value) {
            setOpenMobile(!openMobile.value);
        } else {
            setOpen(!open.value);
        }
    };

    useEventListener('keydown', (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
            toggleSidebar();
        }
    });

    const state = computed(() => (isMobile.value ? (openMobile.value ? 'expanded' : 'collapsed') : open.value ? 'expanded' : 'collapsed'));

    return { openMobile, open, isMobile, setOpen, setOpenMobile, toggleSidebar, state };
};
