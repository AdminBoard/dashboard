const widgetMap = {}

export function registerWidget(name, widget) {
    widgetMap[name] = widget
}

export function getWidget(name) {
    return widgetMap[name]
}

export default {
    register: registerWidget,
    get: getWidget,
}