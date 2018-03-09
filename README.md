# react-count-down-view

a simple react component for count down

## Use

    npm install react-count-down-view

## Sample code

```` react jsx
    import CountDownView from 'react-count-down-view'

    <CountDownView name="count-first" second={10} trigger={onCountEnd} />

    // 1: you should name your count view
    // 2: set an int value 'second' for count number
    // 3: set a 'trigger' func when count to end

````

```` react jsx

    <CountDownView name="count-two" second={4} trigger={onCountEnd} />

    // you can set another counter named 'count-two'
    // they will count in one 'setTimeout' callback

````

```` react jsx

    let CustomView = function(props) {
        let { second, trigger } = props
        return <div>{second}</div>
    }

    <CountDownView name="count-two" second={4} trigger={onCountEnd} view={CustomView}/>

    // you set your custom count view by set 'view' props

````