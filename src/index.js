import { Component } from 'react'

import Counter from './timer'

class CountDownView extends Component {

    constructor() {
        super()
        this.state = {
            second: 0
        }
    }

    componentDidMount() {
        let { name, second = 0 } = this.props

        let self = this
        if (name && second > 0) {
            this.setState({
                second: second
            })
            Counter.bindCounter(name, (sec) => {
                let second = this.state.second || 0
                second = second - sec

                if (second <= 0) {
                    let trigger = this.props.trigger
                    trigger && trigger()
                    Counter.unbindCounter(name)
                    second = 0
                }

                this.setState({
                    second: second
                })
            })
        }
    }

    componentWillReceiveProps(newProps) {

        // 如果 有新的数据进来 second
        // 初始化 一下 数据 以及 回调
        if (this.props.second !== newProps.second) {
            let { second } = newProps
            if (second > 0) {
                this.setState({
                    second: newProps.second
                })
            }
        }
    }

    render() {
        let View = this.props.view
        let { second } = this.state
        let { trigger } = this.props
        if ( View ) {
            return <View second={second} trigger={trigger}  />
        }
        return <span>{this.state.second}</span>
    }
}

export default CountDownView