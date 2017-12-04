import * as avalon from 'avalon2';

export function findParentComponent(vm, ctype) {
    let parent = vm.$element.parentElement;
    while (parent) {
        if (parent._vm_ && (!ctype || parent._ctype_ === ctype)) {
            return parent._vm_;
        }
        parent = parent.parentElement;
    }
    return null;
}

export function parseSlotToVModel(vmodel, vnodes?: any[]): void {
    if (vnodes === undefined) {
        vnodes = vmodel.$render.root ? vmodel.$render.root.children : [];
    }
    vnodes.forEach(vnode => {
        if (!vnode || !vnode.nodeName || vnode.dom.nodeType !== 1) return true;
        let slotName = vnode.dom.getAttribute('slot');
        if (slotName) {
            delete vnode.props[':skip'];
            delete vnode.props['ms-skip'];
            vmodel[slotName] = avalon.vdom(vnode, 'toHTML');
        } else {
            parseSlotToVModel(vmodel, vnode.children);
        }
    });
}

export function getChildTemplateDescriptor(vmodel, render = vmodel.$render): any[] {
    if (render.directives === undefined) {
        return [];
    }
    return render.directives.reduce((acc, action) => {
        if (action.is) {
            acc.push({
                is: action.is,
                props: action.value,
                inlineTemplate: action.fragment,
                children: getChildTemplateDescriptor(vmodel, action.innerRender || { directives: [] })
            });
        }
        return acc;
    }, []);
}

export function debounce(func, wait: number = 300, immediate: boolean = false) {
	let timeout;
	return function(...args) {
		let context = this;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}