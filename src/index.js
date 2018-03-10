import { Component } from 'react'

import Counter from './timer'

class CountDownView extends Component {

    constructor() {
        super()
        this.state = {
            second: 0
        }
    }

    bindCounter({ name, second = 0 }) {
        Counter.bindCounter({
            name: name,
            second: second,
            callback: (second) => {
                if (second <= 0) {
                    let trigger = this.props.trigger
                    trigger && trigger()
                    Counter.unbindCounter(name)
                } else {
                    let step = this.props.step
                    step && step(second)
                }
                this.setState({
                    second: second
                })
            }
        })
    }

    componentDidMount() {
        let { name, second = 0 } = this.props

        let self = this
        if (name && second > 0) {
            let hook = Counter.checkHookExist(name)
            if (hook) {
                let { second } = hook || {}
                this.setState({
                    second: second
                })
            } else {
                this.setState({
                    second: second
                })
            }

            this.bindCounter(this.props)
        }
    }

    componentWillReceiveProps(newProps) {

        // 如果 有新的数据进来 second
        // 初始化 一下 数据 以及 回调
        if (this.props.second !== newProps.second) {
            let { name, second = 0 } = newProps
            if (second > 0) {
                this.setState({
                    second: newProps.second
                })

                this.bindCounter(newProps)
            }
        }
    }

    render() {
        let View = this.props.view
        let { second } = this.state
        let { trigger } = this.props
        if (View) {
            return <View second={second} trigger={trigger} />
        }
        return <span>{this.state.second}</span>
    }
}

export default CountDownView