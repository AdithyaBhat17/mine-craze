import React from 'react'
import './App.css'
import axios from 'axios'
import Pusher from 'pusher-js'

class Today extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            btc:'',
            ltc:'',
            eth:''
        }
    }

    componentWillMount(){
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=INR,USD')
        .then(response => {
            this.setState({btc:response.data.BTC.INR,ltc:response.data.LTC.INR,eth:response.data.ETH.INR})
            localStorage.setItem('BTC', response.data.BTC.INR)
            localStorage.setItem('LTC', response.data.LTC.INR)
            localStorage.setItem('ETH', response.data.ETH.INR)
        })
        .catch(error => {
            console.log(error)
        })
        this.pusher = new Pusher('KEY', {
            cluster: 'ap2',
            encrypted: true
        })
        this.prices = this.pusher.subscribe('coin-prices')
    }

    sendPricePusher (data) {
        axios.post('/prices/new', {
            prices: data
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount () {
        if (!navigator.onLine) {
            this.setState({ btc: localStorage.getItem('BTC') })
            this.setState({ ltc: localStorage.getItem('LTC') })
            this.setState({ eth: localStorage.getItem('ETH') })
        }
        setInterval(() => {
            axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=INR')
                .then(response => {
                    this.sendPricePusher (response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 5000)
        this.prices.bind('prices', price => {
            this.setState({ btc: price.prices.BTC.INR });
            this.setState({ eth: price.prices.ETH.INR });
            this.setState({ ltc: price.prices.LTC.INR });
          }, this)
     }

    render(){
        return(
            <div className="today">                
                <div className="container today-container">
                    <h3>Current Price</h3>
                    <div className="row">
                        <div className="col-xs-4 thumb">
                            <h5>₹ {this.state.btc}</h5>
                            <span>1 BTC</span> 
                        </div>
                        <div className="col-xs-4 thumb">
                            <h5>₹ {this.state.ltc}</h5>
                            <span>1 LTC</span> 
                        </div>
                        <div className="col-xs-4 thumb">
                            <h5>₹ {this.state.eth}</h5>
                            <span>1 ETH</span> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Today
