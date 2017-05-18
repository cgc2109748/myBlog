<template>
    <div class="ripple"></div>
</template>

<script>
import classlist from 'src/utils/classlist'
const startRipple = function (eventType, event) {
    let holder = event.currentTarget || event.target
    if (holder && !classlist.has(holder, 'ripple')) {
        holder = holder.querySelector('.ripple')
    }
    if (!holder) {
        return
    }

    const prev = holder.getAttribute('data-ui-event')
    if (prev && prev !== eventType) {
        return
    }
    holder.setAttribute('data-ui-event', eventType)

    const rect = holder.getBoundingClientRect()
    let x = event.offsetX
    let y
    if (x === undefined) {
        x = event.clientX - rect.left
        y = event.clientY - rect.top
    } else {
        y = event.offsetY
    }
    const ripple = document.createElement('div')
    let max
    if (rect.width === rect.height) {
        max = rect.width * 1.412;
    } else {
        max = Math.sqrt(
            (rect.width * rect.width) + (rect.height * rect.height)
        )
    }
    const dim = (max * 2) + 'px'
    ripple.style.width = dim
    ripple.style.height = dim
    ripple.style.marginLeft = -max + x + 'px'
    ripple.style.marginTop = -max + y + 'px'
    // Activate/add the element
    ripple.className = 'ripple__ink'
    holder.appendChild(ripple)
    setTimeout(() => {
        classlist.add(ripple, 'is-held')
    }, 0);
    const releaseEvent = (eventType === 'mousedown' ? 'mouseup' : 'touchend')
    const handleRelease = function () {
        document.removeEventListener(releaseEvent, handleRelease)
        classlist.add(ripple, 'is-done')
        // Larger than the animation duration in CSS
        setTimeout(() => {
            holder.removeChild(ripple)
            if (holder.children.length === 0) {
                holder.removeAttribute('data-ui-event')
            }
        }, 650);
    }
    document.addEventListener(releaseEvent, handleRelease)
};
const handleMouseDown = function (e) {
    // Trigger on left click only
    if (e.button === 0) {
        startRipple(e.type, e)
    }
};
const handleTouchStart = function (e) {
    if (e.changedTouches) {
        for (let i = 0; i < e.changedTouches.length; ++i) {
            startRipple(e.type, e.changedTouches[i])
        }
    }
}
export default {
    name: 'ripple',
    props: {
        trigger: {
            type: String,
            required: true
        }
    },
    watch: {
        trigger() {
            this.initialize()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initialize()
        });
    },
    beforeDestroy() {
        const triggerEl = this.trigger ? this.$parent.$refs[this.trigger] : null
        if (!triggerEl) {
            return
        }
        triggerEl.removeEventListener('mousedown', handleMouseDown)
        triggerEl.removeEventListener('touchstart', handleTouchStart)
    },
    methods: {
        initialize() {
            const triggerEl = this.trigger ? this.$parent.$refs[this.trigger] : null
            if (!triggerEl) {
                return
            }
            triggerEl.addEventListener('touchstart', handleTouchStart)
            triggerEl.addEventListener('mousedown', handleMouseDown)
        }
    }
}
</script>

<style lang="scss">
</style>
