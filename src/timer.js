
let _timer = null

let _timer_mark = 0 // check time
let _timer_hook = {}

let LOOP_DELAY = 1000

function reduceHook() {

    let second = checkSecond()
    let count = 0
    for (let key in _timer_hook) {
        let hook = _timer_hook[key]

        if (hook) {
            ++count
            if (second > 0) {
                hook && hook(second)
            }
        }
    }
    if (count == 0) {
        return false
    }

    return true
}

function checkSecond() {
    let now = new Date().getTime()
    let second = parseInt((now - _timer_mark) / 1000)
    if (second > 0) {
        _timer_mark = _timer_mark + second * 1000
    }
    return second
}

function checkLoop() {
    _timer = setTimeout(() => {
        let flag = reduceHook()

        if (flag) {
            checkLoop()
        }
    }, LOOP_DELAY);
}

function startLoop() {
    if (_timer) {
        return
    }
    _timer_mark = new Date().getTime()
    _timer = setTimeout(() => {
        let flag = reduceHook()


        if (flag) {
            checkLoop()
        } else {
            clearTimeout(_timer)
            _timer = null
        }
    }, LOOP_DELAY);
}

function bindCounter(name, callback) {
    if (name) {
        _timer_hook[name] = callback
        startLoop()
    }
}

function unbindCounter(name) {
    if (_timer_hook[name]) {
        let hooks = {}
        for (let key in _timer_hook) {
            if (key !== name) {
                hooks[key] = _timer_hook[key]
            }
        }
        _timer_hook = hooks
    }
}

export default {
    bindCounter,
    unbindCounter
}